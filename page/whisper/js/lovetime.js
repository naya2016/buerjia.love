function lovetime() {
    window.setTimeout(lovetime, 1000);  // 不用字符串作为 setTimeout 第二个参数
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    
    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();      // 以 0 开始的月
    var todayDate = today.getDate();
    var todayHour = today.getHours();
    var todayMinute = today.getMinutes();
    var todaySecond = today.getSeconds();

    // 注意，月份是从0开始，所以如果是2024年3月30日，要用2表示3月
    var t1 = Date.UTC(2024, 2, 30, 0, 0, 0);  // 此处表示 2024年3月30日
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);

    var diff = t2 - t1;

    var diffDays = Math.floor(diff / days);
    var diffHours = Math.floor((diff - diffDays * days) / hours);
    var diffMinutes = Math.floor((diff - diffDays * days - diffHours * hours) / minutes);
    var diffSeconds = Math.floor((diff - diffDays * days - diffHours * hours - diffMinutes * minutes) / seconds);

    document.getElementById("lovetime").innerHTML = "我们成为好朋友已经 " + diffDays + " 天 " + 
                                                   diffHours + " 小时 " + diffMinutes + " 分钟 " + diffSeconds + " 秒啦";
}

lovetime();
