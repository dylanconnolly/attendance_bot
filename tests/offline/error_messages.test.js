const { test, expect } = require('@jest/globals')
const ClientMock = require('./clientMock.js')



test("date parse only removes date formatted objects", async () => {
    let input = {
        content: "!attendance 08/01 09/22 12/1 3/06 characters are typed and should stay the same. Dashes will work here 1-2 maybe 1-3-4-5 times. Normal slashes/work",
        author: {
            username: "test_user"
        }
    }

    let response = await ClientMock.messageTrigger(input)
    
    let expectedResponse = [
        ["test_user", "08/01", "characters are typed and should stay the same. Dashes will work here 1-2 maybe 1-3-4-5 times. Normal slashes/work"],
        ["test_user", "09/22", "characters are typed and should stay the same. Dashes will work here 1-2 maybe 1-3-4-5 times. Normal slashes/work"],
        ["test_user", "12/1", "characters are typed and should stay the same. Dashes will work here 1-2 maybe 1-3-4-5 times. Normal slashes/work"],
        ["test_user", "3/06", "characters are typed and should stay the same. Dashes will work here 1-2 maybe 1-3-4-5 times. Normal slashes/work"]
    ]

    expect(response).toEqual(expectedResponse);
})

test("input message if there are dates and the word 'help' appears in the string, treat as normal absence and record date and reason", async () => {
    let input = {
        content: "!attendance 1/1 I need to help my mom do laundry",
        author: {
            username: "test_user"
        }
    }

    let expectedResponse = [
        ["test_user", "1/1", "I need to help my mom do laundry"]
    ]

    let response = await ClientMock.messageTrigger(input)
    
    expect(response).toEqual(expectedResponse)  
}) 

test("a message without a date, but with a sentance containing more than 'help' will prompt the missing date error message", async () => {
    let input = {
        content: "!attendance I need to help my mom do laundry",
        author: {
            username: "test_user"
        }
    }
    
    let expectedResponse2 = "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."
    
    let response2 = await ClientMock.messageTrigger(input)
    
    expect(response2).toEqual(expectedResponse2)
})

test("message with only the word help in it will return the help message", async () =>{
    let inputHelpSuccess = {
        content: "!attendance help",
        author: {
            username: "test_user"
        }
    }

    let helpSuccessReturn = "**Ok idiot, here's some help.**\n\nYou can provide dates that you will be absent using the `!attendance` command (ex: !attendance 12/25)\n\nYou can also provide a list of individual dates (ex: `!attendance 6/12 7/18 8/1`) or a date range (ex: `!attendance 6/12-6/18`)\n\n**Optional** You can provide a reason for your absence by typing sentences after the date/dates provided (ex: `!attendance 6/22 Working late` or `!attendance 6/22-6/28 Vacation`)\n\nValid date formats are:\n-MM/DD\n-M/D\n-Date ranges as M/D-M/D or MM/DD-MM/DD"

    let response = await ClientMock.messageTrigger(inputHelpSuccess)


    expect(response).toEqual(helpSuccessReturn)
})

test("the missing date error message should be sent when no message is provided after !attendance", async () => {
    let input = {
        content: "!attendance",
        author: {
            username: "test_user"
        }
    }

    let expectedResponse = "just like you I couldn't find any dates. Please try again or use `!attendance help` for more details."

    let response = await ClientMock.messageTrigger(input)


    expect(response).toEqual(expectedResponse)
})