
const UploadExelData = require('../model/upload_exel.modal');
const xlsx = require('xlsx');


const upload = (req, res) => {
    const excelFiles = req.files.excelFile;

    if (!excelFiles || !excelFiles[0]) {
        return res.status(400).send('No file uploaded.');
    }
    const buffer = excelFiles[0].buffer; // Access the buffer directly
    const workbook = xlsx.read(buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);
    // Insert each row into MongoDB
    excelData.forEach(async (row) => {
        try {
            const uploadData = new UploadExelData(row);
            await uploadData.save();

        } catch (error) {
            console.error('Error inserting data:', error);
        }
    });

    return res.send({ message: 'Excel data uploaded successfully!' });
};



const getdata = async (req, res) => {
    try {
        try {
            // Retrieve all data from the MongoDB collection
            const data = await UploadExelData.find({});

            // Send the data as JSON in the response
            return res.send({ message: data })
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        return res.send({ error: error })
    }
}
module.exports = { upload,getdata };