module.exports.toDateString = function(date) {

    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    return (new Date(date)).Format("yyyy-MM-dd hh:mm:ss.S");
}

module.exports.toDuration = function(second) {
    function MillisecondToDate(msd) {
        var time = parseFloat(msd) / 1000;
        if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + ":" + parseInt((parseFloat(time / 60.0) -
                    parseInt(time / 60.0)) * 60);
            } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + ":" + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + ":" +
                    parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
            } else {
                time = parseInt(time);
            }
        }
        return time;
    }
    return MillisecondToDate(second);
}
