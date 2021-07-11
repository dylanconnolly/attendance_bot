const HelperModule = require ('../helpers.js')
const gService = require('../gSheet.js')

// - author 
// - substring

async function addAttendanceRecord(msg, author) {
    try{
        let dates = []
        let dateRange = HelperModule.dateRangeParse(msg)
        let reasonString = ''

        if(dateRange){
            dateRange.forEach(range => {
                dates.push(range)
                reasonString = msg.replace(range, '')
            })
        }else{
            dates = HelperModule.dateParse(msg)
            reasonString = msg.replace(dates, '')
        };

        reasonString = reasonString.trim()

        let rowData = []

        if(!dates && reasonString.toLowerCase() == 'help'){
            return {
                success: true,
                messageType: "channel",
                message: "**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD"
            }
        }else if(!dates){
            return {
                success: true,
                messageType: "reply",
                message: "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."
            }
        }
        
        let successMessage = `added the following date(s):`

        dates.forEach(date => {
            rowData.push([author, date, reasonString])
            successMessage += ` ${date}`
        })

        let response = await gService.appendRows(rowData)

        if(response.success){
            return {
                success: true,
                messageType: "reply",
                message: successMessage
            }
        }else{
            return {
                success: false,
                messageType: "error",
                message: response.message
            }
        };        
    }catch(err){
        console.log(err)
        return {
            success: false,
            messageType: "error",
            message: err
        }
    }
}

exports.addAttendanceRecord = addAttendanceRecord