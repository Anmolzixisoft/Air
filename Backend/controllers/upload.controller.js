
const UploadExelData = require('../model/upload_exel.modal');
const xlsx = require('xlsx');


const upload = (req, res) => {
    const excelFiles = req.files.excelFile;

    if (!excelFiles || !excelFiles[0]) {
        return res.status(400).send({ message: 'No file uploaded.', status: false });
    }
    const buffer = excelFiles[0].buffer; // Access the buffer directly
    const workbook = xlsx.read(buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);
    // Insert each row into MongoDB
    excelData.forEach(async (row) => {
        try {
            // const uploadData = new UploadExelData(row);
            const uploadData = new UploadExelData({
                Shipping_Bill_No: row['Shipping Bill No'],
                // Add other fields as needed
              
                Shipping_Bill_Date : row['Shipping Bill No'],
                IEC : row['IEC'],
                EXPORTER:row['EXPORTER'],
                EXPORTER_ADDRESS_AND_CITY : row['EXPORTER_ADDRESS_&_CITY'],
                City : row['City'],
                PIN : row['PIN'],
                State : row['State'],
                CONTACT_NO : row['CONTACT_NO'],
                E_MAIL_ID : row['E_MAIL_ID'],
                CONSINEE : row['CONSINEE'],
                CONSINEE_ADDRESS : row['CONSINEE_ADDRESS'],
                PORT_CODE : row['PORT_CODE'],
                FOREIGN_PORT: row['FOREIGN_PORT'],
                FOREIGN_COUNTRY: row['FOREIGN_COUNTRY'],
                HS_CODE: row['HS_CODE'],
                CHAPTER: row['CHAPTER'],
                PRODUCT_DESCRIPITION: row['PRODUCT_DESCRIPITION'],
                QUANTITY: row['QUANTITY'],
                UNIT_QUANTITY: row['UNIT_QUANTITY'],
                ITEM_RATE_IN_FC: row['ITEM_RATE_IN_FC Very Imp. Some time Unit rate is from 1 unit to 1000 unit'],
                CURRENCY: row['CURRENCY'],
                Total_Value_IN_FC: row['Total_Value_IN_FC'],
                Unit_Rate_In_USD_Exchange: row['Unit_Rate_In_USD_(Exchange)'],
                Exchange_Rate_USD: row['Exchange_Rate_(USD)'],
                Total_Value_IN_USD_Exchange: row['Total_Value_IN_USD_(Exchange)'],
                Unit_Rate_in_INR: row['Unit Rate in INR'],
                FOB_In_INR: row['FOB In INR'],
                INVOICE_SERIAL_NUMBER: row['INVOICE_SERIAL_NUMBER'],
                INVOICE_NUMBER: row['INVOICE_NUMBER'],
                ITEM_NUMBER: row['ITEM_NUMBER'],
                DRAWBACK:row['DRAWBACK'],
                MONTH: row['MONTH'],
                YEAR: row['YEAR'],
                MODE: row['MODE'],
                INDIAN_PORT: row['INDIAN_PORT'],
                CUSH: row['CUSH'],
            });
            await uploadData.save();

        } catch (error) {
            console.error('Error inserting data:', error);
            return res.send({ error: error, status: false })
        }
    });

    return res.send({ message: 'Excel data uploaded successfully!', status: true });
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
module.exports = { upload, getdata };