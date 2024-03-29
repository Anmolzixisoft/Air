const path = require('path');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         try {
//             cb(null, "public");
//         } catch (e) {
//             cb(e, false);
//         }
//     },
//     filename: function (req, file, cb) {
//         const date = new Date();
//         let d = date.getDate().toString();
//         let m = date.getMonth() + 1;
//         let y = date.getFullYear().toString();
//         var currentDate = y + m + d;
//         cb(null, file.fieldname + '_' + currentDate + '_' + Date.now() + '_' + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
// });
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024, // 1 GB limit
    },
});
const singleUpload = upload.fields([{ name: 'excelFile' }]);
// const singleUpload = upload.fields([{ name: 'excelFile' }]);

// var multiplepUload = upload.fields([{ name: 'pan_upload' }, { name: 'coi_upload' }, { name: 'moa_upload' }, { name: 'aoa_upload' }, { name: 'gst_upload' }, { name: 'cheque_upload' }])
// var multiplepUload = upload.fields([{ name: 'aadhar_image' }, { name: 'license_image' }, { name: 'aadhar_image_back' }, { name: 'profile_image' }]);

module.exports = { singleUpload };