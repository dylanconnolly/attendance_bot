const Discord = require('discord.js');
const { listenerCount } = require('events');
const client = new Discord.Client();
// require('dotenv').config();
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const gService = require('./gSheet.js')

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => { 
    if (msg.content.startsWith('!attendance')){
        let author = msg.author.username
        let substring = msg.content.substring(12)

        const datesRegEx = /([0-9]+[\/-][0-9]+)/g
        const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
        const reasonRegEx = /\b[^\d\/-]+\b/g
        
        if(substring.includes("help")){
            msg.author.send("**Ok idiot, here's some help**\n\nYou can provide dates that you will be absent using the `!attendance` command\n\nYou can either provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can also provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation to Burma`)\n\nValid date formats are:\n-MM/DD\n-MM-DD\n-M/D\n-M-D\n")
            return
        }

        let dates = []
        
        let dateRange = msg.content.match(dateRangeRegEx)
        let reasonString = substring.match(reasonRegEx).slice(-1)[0]
        // let dates = substring.match(datesRegEx)
        
        try{
            if(dateRange){
                console.log('date range found')
                dateRange.forEach(range => {
                    dates.push(range)
                })
            }else{
                dates = substring.match(datesRegEx)
            }

            console.log(dates)

            let rowData = []
            if(!dates){
                console.log("No dates input in message:", msg.content)
                msg.reply("just like you I couldn't find any dates. Please try again or use `!attendance help` for me details.")
                return
            }

            

            dates.forEach(date => {
                rowData.push([author, date, reasonString])
            })

            gService.appendRows(rowData)

            let successMessage = "Successfully added the following dates to spreadsheet:"

            dates.forEach(date => {
                successMessage += ` ${date}`
            });

            msg.reply(successMessage)
        }catch(error){
            console.log(error)
            msg.reply("An error occured, please contact Tikk to fix it.")
        }
    }
});

client.login(process.env.BOT_KEY)