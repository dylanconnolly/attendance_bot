

async function messageTrigger(msg) {
    if (msg.content.toLowerCase().startsWith('!attendance')){
        console.log('im in the !attendance area...')
        let author = msg.author.username
        let substring = msg.content.substring(12)
        // let missingInfoResponse = "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."

        const datesRegEx = /[0-9]{1,2}[\/][0-9]{1,2}/g
        const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
        // console.log("does string include help??", substring.includes("help"))
        // if(substring.includes("help")){
        //    console.log("**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD")
        //    return("**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD")
        // }

        let dates = []
        
        let dateRange = msg.content.match(dateRangeRegEx)

        let reasonString = ''
        
        try{
            if(dateRange){
                console.log('date range found')
                dateRange.forEach(range => {
                    dates.push(range)
                    reasonString = substring.replace(range, '')
                })
            }else{
                dates = substring.match(datesRegEx)
                reasonString = substring.replace(datesRegEx, '')
            }

            console.log("dates found:", dates)

            let rowData = []
            
            reasonString = reasonString.trim()
            
            if(!dates && reasonString.toLowerCase() == "help"){
                // msg.channel.send("**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD")
                return"**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD"
            }else if(!dates){
                console.log("No dates input in message:", msg.content)
                
                // msg.reply("just like you I couldn't find any dates. Please try again or use `!attendance help` for more details.")
                return "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."
            }


            dates.forEach(date => {
                rowData.push([author, date, reasonString])
            })

            return rowData
        }catch(err){
            return err
        }
    }
};

exports.messageTrigger = messageTrigger