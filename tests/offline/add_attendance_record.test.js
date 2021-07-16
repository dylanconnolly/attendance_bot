const { test, expect } = require('@jest/globals')
const functions = require('../../functions/addAttendanceRecord')

const missingDateMessage = "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."
const helpMessage = "**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD"

test("a completed call returns object with success = true, messageType = 'reply', and message as success string", async () => {
    let author = "John Monn"
    let message = "1/1 going to be helping move people. Gone 1-2 hours."

    let response = await functions.addAttendanceRecord(message, author)
    console.log(response)
    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("reply")
    expect(response.message).toEqual("added the following date(s): 1/1")
})

test("a message with a date and the word 'help' will still add the absence to calendar", async () => {
    let author = "Help NEEded"
    let message = "1/1 I need to help my roommate cook chicken or something."

    let response = await functions.addAttendanceRecord(message, author)
    console.log(response)
    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("reply")
    expect(response.message).toEqual("added the following date(s): 1/1")

    let message2 = "1/2 help"

    let response2 = await functions.addAttendanceRecord(message2, author)

    expect(response2.success).toEqual(true)
    expect(response2.messageType).toEqual("reply"),
    expect(response2.message).toEqual("added the following date(s): 1/2")
})

test("if no dates are provided in message, return success == true, messageType = 'reply', message as missingDateMessage", async () => {
    let author = "Bilbo Nilbo"
    let message = "I'm gonna be gone for a bit before this coming up 00023 minutes"

    let response = await functions.addAttendanceRecord(message, author)
    
    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("reply")
    expect(response.message).toEqual(missingDateMessage)
})

test("if no dates are provided and the word 'help' is in the string, still return missingDate response", async () => {
    let author = "Kyle Rodr"
    let message = "I'm gonna help milk a cow yeeewooohehaehae 080283200/askdjad"

    let response = await functions.addAttendanceRecord(message, author)
    
    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("reply")
    expect(response.message).toEqual(missingDateMessage)
})

test("if no dates are provided and only the word 'help' appears in string, respond with help message", async () => {
    let author = "Help Me"
    let message = "help"
    let message2 = "HELP"

    let response = await functions.addAttendanceRecord(message, author)
    let response2 = await functions.addAttendanceRecord(message2, author)

    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("channel")
    expect(response.message).toEqual(helpMessage)
    expect(response2.success).toEqual(true)
    expect(response2.messageType).toEqual("channel")
    expect(response2.message).toEqual(helpMessage)
})

test("if empty strings are provided for msg and author arguments it fails gracefully", async () => {
    let author = ""
    let message = ""

    let response = await functions.addAttendanceRecord(message, author)
    
    expect(response.success).toEqual(true)
    expect(response.messageType).toEqual("reply")
    expect(response.message).toEqual(missingDateMessage)
})

test("if nulls or undefined are supplied it failes gracefully", async () => {
    let author = null
    let message = null

    let response = await functions.addAttendanceRecord(message, author)
    
    expect(response.success).toEqual(false)
    expect(response.messageType).toEqual("error")

    let author2 = undefined
    let message2 = undefined

    let response2 = await functions.addAttendanceRecord(message2, author2)
    
    expect(response2.success).toEqual(false)
    expect(response2.messageType).toEqual("error")
})