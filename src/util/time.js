export function formatTime (time){
    var ddlUtc = new Date(time);
    var year = ddlUtc.getFullYear();
    var month = (ddlUtc.getUTCMonth() + 1).toString().padStart(2, '0');
    var date = ddlUtc.getUTCDate().toString().padStart(2, '0');
    var hour = ddlUtc.getUTCHours().toString().padStart(2, '0');
    var minute = ddlUtc.getUTCMinutes().toString().padStart(2, '0');
    var ddlValue = year + '-' + month + '-' + date + 'T' + hour + ':' + minute;
    return ddlValue
}

export function formatTimeForNote (time){
    var ddlUtc = new Date(time);
    var year = ddlUtc.getFullYear();
    var month = (ddlUtc.getUTCMonth() + 1).toString().padStart(2, '0');
    var date = ddlUtc.getUTCDate().toString().padStart(2, '0');
    var ddlValue = year + '-' + month + '-' + date;
    return ddlValue
}

export function getToday (){
    var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1; 
        var day = today.getDate();
        return year + "-" + month + "-" + day;
}