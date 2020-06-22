var dayCalendar = {};

var changeCalendarBG = function(){
    for (i = 9; i < 18; i++){
        var el = $("#" + i + "-description");
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

var loadData = function(){
    for (i = 9; i < 18; i++){
        var el = $("#" + i + "-description");
        el.find("span").text(dayCalendar[i-9]);
    }
}

var initialLoad = function(){
    $("#currentDay").text(moment().format("dddd, MMMM Mo"));

    changeCalendarBG();
    setInterval(changeCalendarBG, 1000 * 60 ); //every minute

    dayCalendar = JSON.parse(localStorage.getItem("dayCalendar"));

    if (!dayCalendar){
        dayCalendar = ['', '', '', '', '', '', '', '', '']; 
    }
    else 
        loadData();

}

$(".container .row").on("click", ".col-10", function(){
    $(this).addClass("border-blue");
    var spanEl = $(this).find("span");
  
    var textAreaEl = $("<textarea>").val(spanEl.text().trim());
    textAreaEl.addClass("outline-none");
    $(this).find("span").replaceWith(textAreaEl);
    textAreaEl.trigger("focus");
});


$(".container .row").on("click", ".saveBtn", function(){

    var descEl = $(this).closest(".row").find(".col-10");
    if (!descEl.hasClass("border-blue"))
        return;
    
    descEl.removeClass("border-blue");
    var textAreaEl = descEl.find("textarea");

    var spanEl = $("<span>").text(textAreaEl.val());
    textAreaEl.replaceWith(spanEl);

    var index = parseInt(spanEl.closest("div").attr("id").replace("-description",""));
    dayCalendar[index-9]=spanEl.text();

    localStorage.setItem("dayCalendar", JSON.stringify(dayCalendar));
});


/*$(".container").on("focusout",".row", function(){
    var textAreaEl = $(this).find(".col-10").find("textarea");
    textAreaEl.replaceWith(spanEl);
    spanEl = null;
});*/
  

initialLoad();