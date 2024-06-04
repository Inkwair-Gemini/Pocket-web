const moment = require("moment");
export function getNow() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}
export function getNowTradeDay() {
    return moment().format('YYYY-MM-DD')
}
export function transferTime(time) {
    const date = new Date(time);
    if(date.toString() === "Invalid Date"){
        return "";
    }else{
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
    
}
