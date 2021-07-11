const {google} = require('googleapis');
const { builtinModules } = require('module');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    keyFile: './google-credentials.json',
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ],
});

// let client = new google.auth.JWT({

const sheets = google.sheets({version: 'v4', auth: auth});

async function appendRows(data) {
    console.log('append data:', data)
    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Attendance!A:C',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
        // auth: auth
    };

    try {
        const response = (await sheets.spreadsheets.values.append(request)).data;
        
        console.log(JSON.stringify(response, null, 2));
        return {
            success: true,
            message: JSON.stringify(response, null, 2)
        }
    } catch(err) {
        console.log(err);
        return {
            success: false,
            code: err.code,
            message: err.message
        }
    }
};

async function getSheetData() {
    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Attendance!A:C'
    }
    try{
        const response = (await sheets.spreadsheets.values.get(request)).data.values
        // console.log(response)
        return response
    }catch(error){
        console.error(error)
    }
}

exports.appendRows = appendRows;
exports.getSheetData = getSheetData;