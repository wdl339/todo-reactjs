export function formatTime (time){
    var ddlUtc = new Date(time);
    var year = ddlUtc.getFullYear();
    var month = (ddlUtc.getUTCMonth() + 1).toString().padStart(2, '0');
    var date = ddlUtc.getUTCDate().toString().padStart(2, '0');
    var hour = ddlUtc.getUTCHours().toString().padStart(2, '0');
    var minute = ddlUtc.getUTCMinutes().toString().padStart(2, '0');

    var ddlValue = year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
    return ddlValue
}

export function formatTimeWithWeekDay (time){
    var ddlUtc = new Date(time);
    var month = (ddlUtc.getUTCMonth() + 1).toString().padStart(2, '0');
    var date = ddlUtc.getUTCDate().toString().padStart(2, '0');
    var hour = ddlUtc.getUTCHours().toString().padStart(2, '0');
    var minute = ddlUtc.getUTCMinutes().toString().padStart(2, '0');

    var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var dayOfWeek = days[ddlUtc.getUTCDay()];

    var ddlValue = month + '-' + date + ' ' + dayOfWeek + ' ' + hour + ':' + minute;
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
        var month = today.getMonth() + 1; 
        var day = today.getDate();

        var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var dayOfWeek = days[today.getUTCDay()];

        return month + "-" + day + " " + dayOfWeek;
}