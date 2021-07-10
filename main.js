const Discord = require('discord.js');
const { listenerCount } = require('events');
const client = new Discord.Client();
// require('dotenv').config();
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const gService = require('./gSheet.js')
const absences = require('./absences.js');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', async msg => { 
    console.log('ive picked up the message trigger')
    if (msg.content.toLowerCase().startsWith('!attendance')){
        console.log('im in the !attendance area...')
        let author = msg.author.username
        let substring = msg.content.substring(12)
        let missingInfoResponse = "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."

        const datesRegEx = /([0-9]+[\/][0-9]+)/g
        const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
        const reasonRegEx = /\b[^,\d\/-]+\b/g
        
        if(substring.includes("help")){
           await msg.channel.send("**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD")
        }

        let dates = []
        
        let dateRange = msg.content.match(dateRangeRegEx)

        let reasonParse = substring.match(reasonRegEx)
        
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
                msg.reply(missingInfoResponse)
                return
            }

            if(reasonParse){
                reasonString = substring.match(reasonRegEx).slice(-1)[0]
            }
            else{
                reasonString = ''
            }

            dates.forEach(date => {
                rowData.push([author, date, reasonString])
            })

            gService.appendRows(rowData)

            let successMessage = `added the following date(s):`

            dates.forEach(date => {
                successMessage += ` ${date}`
            });

            await msg.reply(successMessage)
            
        }catch(error){
            console.log(error)
            await msg.reply("An error occured, contact Tikk to fix it.")
        }
    }else if(msg.content.toLowerCase().startsWith('!checkattendance')){
        console.log('im in the checkattendance area....')
        let spreadSheetData = await gService.getSheetData()
        console.log('just finished getting the data from spreadshet...')
        console.log('the data is: ------------', spreadSheetData )
        
        let response = absences.getMissingOnDate(msg.content, spreadSheetData)
        console.log("response in checkattendance tree ---", response)
        
        if(response != ''){
            await msg.channel.send("Absences found:")
            await msg.channel.send(response);
            console.log('ive finished sending channel message')
        }else{
            await msg.channel.send("Did not find any absences")
        };
        
    }else{
        console.log("didn't get a command...")
        return
    };
});

client.login(process.env.BOT_KEY)

