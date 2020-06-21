var changeCalendarBG = function(){
    for (i = 9; i < 18; i++){
        var el = $("#" + i);
        el.removeClass("past present future");
        currentHour = parseInt(moment().format("H"));
        if (i < currentHour)
            el.addClass("past");
        else if (i == currentHour)
            el.addClass("present");
        else
            el.addClass("future");
    }
}

var initialLoad = function(){
    $("#currentDay").text(moment().format("dddd, MMMM Mo"));

    changeCalendarBG();
    setInterval(changeCalendarBG, 1000 * 60 ); //every minute
}

initialLoad();