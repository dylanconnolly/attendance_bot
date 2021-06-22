const Discord = require('discord.js');
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
    if (msg.content === 'ping') {
    msg.reply('pong');
    console.log(msg.author.username)
    }
 

    if (msg.content.startsWith('!attendance')){
        let author = msg.author.username
        let substring = msg.content.substring(12)

        const datesRegEx = /([0-9]+[\/-][0-9]+)/g
        const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
        // let reasonRegEx = /[^0-9,\/-]/g


        // need to slice and check if there are multiple dates: '7/13, 7/14, 7/15, im gone'
        // let sliced = substring.split(', ')

        // console.log(sliced)

        // will always be array
        let dates = msg.content.match(datesRegEx)
        let dateRange = msg.content.match(dateRangeRegEx)

    try{
        if(dateRange){
            console.log('date range found')
            dateRange.forEach(range => {
                dates.push(range)
            })
        }

        let rowData = []
        if(!dates){
            console.log("No dates input in message:", msg.content)
            msg.reply("similar to you I couldn't find any dates. Please supply at least one date (MM/DD or MM-DD)")
            return
        }

        dates.forEach(date => {
            rowData.push([author, date])
        })

        console.log(author)
        console.log(rowData)

            gService.appendRows(rowData)

            let successMessage = "Successfully added dates to spreadsheet:"

            dates.forEach(date => {
                successMessage += date
            });

            msg.reply(successMessage)

        }catch(error){
            console.log(error)
            msg.reply("An error occured, yell at Hoboes.")
        }
    }
});

console.log(process.env)

 client.login(process.env.BOT_KEY)