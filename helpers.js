function dateRangeParse(string) {
    const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
    return string.match(dateRangeRegEx)
}

// function dateParse(string) {
//     const datesRegEx = /([0-9]+[\/][0-9]+)/g
// }

exports.dateRangeParse = dateRangeParse