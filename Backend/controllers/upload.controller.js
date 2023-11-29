
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

                Shipping_Bill_Date: row['Shipping Bill No'],
                IEC: row['IEC'],
                EXPORTER: row['EXPORTER'],
                EXPORTER_ADDRESS_AND_CITY: row['EXPORTER_ADDRESS_&_CITY'],
                City: row['City'],
                PIN: row['PIN'],
                State: row['State'],
                CONTACT_NO: row['CONTACT_NO'],
                E_MAIL_ID: row['E_MAIL_ID'],
                CONSINEE: row['CONSINEE'],
                CONSINEE_ADDRESS: row['CONSINEE_ADDRESS'],
                PORT_CODE: row['PORT_CODE'],
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
                DRAWBACK: row['DRAWBACK'],
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
        const draw = req.query.draw;
        const start = parseInt(req.query.start) || 0;
        const length = parseInt(req.query.length) || 10;
        const page = Math.floor(start / length) + 1;

        const searchValue = req.query.search.value;

        const searchConditions = {
            $or: [
                { Shipping_Bill_No: { $regex: searchValue, $options: 'i' } },
                { Shipping_Bill_Date: { $regex: searchValue, $options: 'i' } },
                { IEC: { $regex: searchValue, $options: 'i' } },
                { EXPORTER: { $regex: searchValue, $options: 'i' } },
                { EXPORTER_ADDRESS_AND_CITY: { $regex: searchValue, $options: 'i' } },
                { City: { $regex: searchValue, $options: 'i' } },
                { PIN: { $regex: searchValue, $options: 'i' } },
                { State: { $regex: searchValue, $options: 'i' } },
                { CONTACT_NO: { $regex: searchValue, $options: 'i' } },
                { E_MAIL_ID: { $regex: searchValue, $options: 'i' } },
                { CONSINEE: { $regex: searchValue, $options: 'i' } },
                { CONSINEE_ADDRESS: { $regex: searchValue, $options: 'i' } },
                { PORT_CODE: { $regex: searchValue, $options: 'i' } },
                { FOREIGN_PORT: { $regex: searchValue, $options: 'i' } },
                { FOREIGN_COUNTRY: { $regex: searchValue, $options: 'i' } },
                { HS_CODE: { $regex: searchValue, $options: 'i' } },
                { CHAPTER: { $regex: searchValue, $options: 'i' } },
                { PRODUCT_DESCRIPITION: { $regex: searchValue, $options: 'i' } },
                { QUANTITY: { $regex: searchValue, $options: 'i' } },
                { UNIT_QUANTITY: { $regex: searchValue, $options: 'i' } },
                { ITEM_RATE_IN_FC: { $regex: searchValue, $options: 'i' } },
                { CURRENCY: { $regex: searchValue, $options: 'i' } },
                { Total_Value_IN_FC: { $regex: searchValue, $options: 'i' } },
                { Unit_Rate_In_USD_Exchange: { $regex: searchValue, $options: 'i' } },
                { Exchange_Rate_USD: { $regex: searchValue, $options: 'i' } },
                { Total_Value_IN_USD_Exchange: { $regex: searchValue, $options: 'i' } },
                { Unit_Rate_in_INR: { $regex: searchValue, $options: 'i' } },
                { FOB_In_INR: { $regex: searchValue, $options: 'i' } },
                { INVOICE_SERIAL_NUMBER: { $regex: searchValue, $options: 'i' } },
                { INVOICE_NUMBER: { $regex: searchValue, $options: 'i' } },
                { ITEM_NUMBER: { $regex: searchValue, $options: 'i' } },
                { DRAWBACK: { $regex: searchValue, $options: 'i' } },
                { MONTH: { $regex: searchValue, $options: 'i' } },
                { YEAR: { $regex: searchValue, $options: 'i' } },
                { MODE: { $regex: searchValue, $options: 'i' } },
                { INDIAN_PORT: { $regex: searchValue, $options: 'i' } },
                { CUSH: { $regex: searchValue, $options: 'i' } },
            ],

        };

        const data = await UploadExelData.find(searchConditions).skip(start).limit(length);
        const totalCount = await UploadExelData.countDocuments(searchConditions);
        const responseData = data.map((item, index) => {
            return {
                count: start + index + 1,
                ...item._doc,
            };
        });

        return res.status(200).json({
            draw: draw,
            recordsTotal: totalCount,
            recordsFiltered: totalCount,
            data: responseData,
        });
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { upload, getdata };