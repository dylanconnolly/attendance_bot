const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

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

    if(dateRange){
        console.log('date range found')
        dateRange.forEach(range => {
            dates.push(range)
        })
    }

    console.log(author)
    console.log(dates)

    msg.reply('got the note')
    }
});

 client.login(process.env.BOT_KEY)