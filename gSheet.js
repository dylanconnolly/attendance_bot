const {google} = require('googleapis');
const { builtinModules } = require('module');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    keyFile: './attendancebot-317613-09e483312aed.json',
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ],
});

// let client = new google.auth.JWT({

// })

const sheets = google.sheets({version: 'v4', auth: auth});


async function appendRows(data) {
    console.log('append data:', data)
    const request = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Sheet1!A:B',
        valueInputOption: 'USER_ENTERED',
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
    } catch (err) {
        console.error(err);
    }
};

// appendRows()

exports.appendRows = appendRows;