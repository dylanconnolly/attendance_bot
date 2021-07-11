function dateRangeParse(string) {
    const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g
    return string.match(dateRangeRegEx)
}

function dateParse(string) {
    const datesRegEx = /[0-9]{1,2}+[\/][0-9]{1,2}/g
    return string.match(datesRegEx)
}

exports.dateRangeParse = dateRangeParse
exports.dateParse = dateParse