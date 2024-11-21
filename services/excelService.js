const XLSX = require('xlsx');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

// Extract data from Excel
const extractDataFromExcel = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return data;
};

// Generate a unique ID
const generateUniqueId = () => uuidv4();

// Generate a random password
const generatePassword = (length = 8) => {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
};

module.exports = {
    extractDataFromExcel,
    generateUniqueId,
    generatePassword,
};
