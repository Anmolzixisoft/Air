// models/user.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    Shipping_Bill_No: {
        type: String,
        default: null,
        // required: true
    },
    Shipping_Bill_Date: {
        type: String,
        default: null,
        // required: true,
        // unique: true
    },
    IEC: {
        type: String,
        default: null,
        // required: true
    },
    EXPORTER: {
        type: String,
        default: null,
    },
    EXPORTER_ADDRESS_AND_CITY: {
        type: String,
        default: null,
        // required: true
    },
    City: {
        type: String,
        // required: true
        default: null,
    },
    PIN: {
        type: String,
        // required: true
        default: null,
    },
    State: {
        type: String,
        // required: true
        default: null,
    },
    CONTACT_NO: {
        type: String,
        // required: true
        default: null,
    },
    E_MAIL_ID: {
        type: String,
        // required: true
        default: null,
    },
    CONSINEE: {
        type: String,
        // required: true
        default: null,
    },
    CONSINEE_ADDRESS: {
        type: String,
        // required: true
        default: null,
    },

    PORT_CODE: {
        type: String,
        // required: true
        default: null,
    },
    FOREIGN_PORT: {
        type: String,
        // required: true
        default: null,
    },
    FOREIGN_COUNTRY: {
        type: String,
        // required: true
        default: null,
    },
    HS_CODE: {
        type: String,
        // required: true
        default: null,
    },
    CHAPTER: {
        type: String,
        // required: true
        default: null,
    },
    PRODUCT_DESCRIPITION: {
        type: String,
        default: null,
        // required: true
    },
    QUANTITY: {
        type: String,
        // required: true
        default: null,
    },
    UNIT_QUANTITY: {
        type: String,
        default: null,
    },
    ITEM_RATE_IN_FC: {
        type: String,
        // required: true
        default: null,
    },
    CURRENCY: {
        type: String,
        // required: true
        default: null,
    },
    Total_Value_IN_FC: {
        type: String,
        default: null,
        // required: true
    },
    Unit_Rate_In_USD_Exchange: {
        type: String,
        // required: true
        default: null,
    },
    Exchange_Rate_USD: {
        type: String,
        // required: true
        default: null,
    },
    Total_Value_IN_USD_Exchange: {
        type: String,
        // required: true
        default: null,
    },
    Unit_Rate_in_INR: {
        type: String,
        // required: true
        default: null,
    },
    FOB_In_INR: {
        type: String,
        // required: true
        default: null,
    },
    INVOICE_SERIAL_NUMBER: {
        type: String,
        // required: true
        default: null,
    },
    INVOICE_NUMBER: {
        type: String,
        // required: true
        default: null,
    },
    ITEM_NUMBER: {
        type: String,
        // required: true
        default: null,
    },
    MONTH: {
        type: String,
        default: null,
        // required: true
    },
    YEAR: {
        type: String,
        // required: true
        default: null,
    },
    MODE: {
        type: String,
        // required: true
        default: null,
    },
    INDIAN_PORT: {
        type: String,
        // required: true
        default: null,
    },


    CUSH: {
        type: String,
        default: null,
    }





});

module.exports = mongoose.model('UploadExel', uploadSchema);
