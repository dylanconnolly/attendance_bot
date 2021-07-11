const HelperModule = require('./helpers')

function getMissingOnDate(dateSearch, arrayOfDates) {
    let substring = dateSearch.substring(17)
    
    const datesRegEx = /([0-9]+[\/][0-9]+)/g

    let dateQueryString = substring.match(datesRegEx)

    if(!dateQueryString){
        return("Must provide a date to check attendance. (ex: !checkattendance 12/25)")
    };


    // const dateRangeRegEx = /([0-9]+\/[0-9]+-[0-9]+\/[0-9]+)/g

    let matches = []
    try{
        arrayOfDates.forEach(rowArray => {
            let dateRange = HelperModule.dateRangeParse(rowArray[1])
            // console.log('dateRange return for', rowArray, ':', dateRange)
            if(dateRange){
                let rangeSplit = dateRange[0].split('-')
                let startDate = new Date(rangeSplit[0])
                let finishDate = new Date(rangeSplit[1])
                let queryDate = new Date(dateQueryString)

                if(startDate <= queryDate && queryDate <= finishDate){
                    matches.push(rowArray[0])
                }
            }
            else{
                let queryDate = new Date(dateQueryString)
                let rowDate = new Date(rowArray[1])
                
                if(queryDate.getTime() === rowDate.getTime()){
                    matches.push(rowArray[0])
                }
            }
        })

        return matches
    }catch(err){
        console.log(err)
        return("An error occurred. Contact Tikk to get it sorted out.")
    }
}

exports.getMissingOnDate = getMissingOnDate