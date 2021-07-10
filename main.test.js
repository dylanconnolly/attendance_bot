const { test, expect } = require('@jest/globals')
const absences = require('./absences.js')

test("query string", () => {
    let date = "!checkattendance 7/6"
    let data = [
        ["hobo", "7/2-7/11", "vacation"],
        ["Eclip", "7/6", "going away"],
        ["Tikk", "8/4", "wedding"],
        ["Dark", "8/15", "something"],
        ["Shadow", "7/16", "scuba diving"],
    ]

    let response = absences.getMissingOnDate(date, data)

    expect(response).toEqual(['hobo', 'Eclip'])
})

test("date ranges outside the query", () => {
    let date = "!checkattendance 7/6"
    let data = [
        ["hobo", "7/2-7/5", "vacation"],
        ["Eclip", "7/6", "going away"],
        ["Tikk", "7/5-7/6", "wedding"],
        ["Dark", "8/1-8/6", "something"],
        ["Shadow", "7/6-7/8", "scuba diving"],
    ]

    let response = absences.getMissingOnDate(date, data)

    expect(response).toEqual(['Eclip', 'Tikk', 'Shadow'])
})

test("no matching dates", () => {
    let date = "!checkattendance 7/6"
    let data = [
        ["hobo", "7/2", "vacation"],
        ["Eclip", "7/12", "going away"],
        ["Tikk", "7/5-7/5", "wedding"],
        ["Dark", "8/1-8/6", "something"],
        ["Shadow", "7/7-7/16", "scuba diving"],
    ]

    let response = absences.getMissingOnDate(date, data)

    expect(response).toEqual([])
})

test("no date provided", () => {
    let date = "!checkattendance 7"
    let date2 = "!checkattendance"
    let data = [
        ["bob", "7/2-7/5", "vacation"],
        ["dylan", "7/6", "going away"],
        ["jess", "7/5-7/6", "wedding"],
        ["casey", "8/1-8/6", "something"],
        ["steph", "7/6-7/8", "scuba diving"],
    ]

    let response = absences.getMissingOnDate(date, data)
    let response2 = absences.getMissingOnDate(date2, data)

    expect(response).toEqual("Must provide a date to check attendance. (ex: !checkattendance 12/25")
    expect(response2).toEqual("Must provide a date to check attendance. (ex: !checkattendance 12/25")
})