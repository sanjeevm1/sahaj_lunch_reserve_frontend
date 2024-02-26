
/**
 * @param {Date} date
 */
export function getCurrentWeek(date){
    
    let monthFirstDay = new Date(`${date.getFullYear()}-${date.getMonth()+1}-01`)

    while(monthFirstDay.getDay()!=1){
        monthFirstDay.setDate(monthFirstDay.getDate()+1)
    }

    return Math.floor((date.getDate()-monthFirstDay.getDate())/7)+1
}