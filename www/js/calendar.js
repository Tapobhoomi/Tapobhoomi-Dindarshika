var year = 2016;
var month = 1;
var weekday = null;
var calerdarxml = null;

function togglemaincalendar(id){if(id == "maincalender"){return "2";}else{ return "1"; }}
$(document).on('swipeleft', '[data-role="page"]', function(event){    
    if(event.handled !== true) // This will prevent event triggering more then once
    {    
        var idNumber = togglemaincalendar($(this).attr('id'));
        var nextpage = $( idNumber == 1? "#maincalender":"#maincalender2");//$("#maincalender2");//$(this).next('[data-role="page"]');
        // swipe using id of next page if exists
        var months = $(calerdarxml).find("calendar[id='"+ year + "'] > month");
        if(months.length > month){
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
            month += 1;
            updatecalendardata(idNumber);
        }
        
        event.handled = true;
    }
    return false;         
});
$(document).on('swiperight', '[data-role="page"]', function(event){   
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var idNumber = togglemaincalendar($(this).attr('id'));
        var prevpage = $(idNumber == 2? "#maincalender2":"#maincalender");//$(this).prev('[data-role="page"]');
        if(month > 1){
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
            month -= 1;
            updatecalendardata(idNumber);
            /*$('.tr-week').remove();
            $(idNumber == 1? "#caltb":"#caltb2").append('<tr class="tr-week"><td width="13%">३१</td><td width="13%"></td><td width="13%"></td><td width="13%"></td><td width="13%"></td><td width="13%">१</td><td width="13%">२</td></tr>            <tr class="tr-week"><td width="13%">३</td><td width="13%">४</td><td width="13%">५</td><td width="13%">६</td><td style="width:13%;border-style: solid;border-color:#f6883d;border-width: 1px;">७</td><td width="13%">८</td><td width="13%">९</td></tr>            <tr class="tr-week"><td width="13%">१०</td><td width="13%">११</td><td width="13%">१२</td><td style="width:13%;">१३</td><td width="13%">१४</td><td width="13%">१५</td><td width="13%">१६</td></tr>            <tr class="tr-week"><td width="13%">१७</td><td width="13%">१८</td><td width="13%">१९</td><td width="13%">२०</td><td width="13%">२१</td><td width="13%">२२</td><td width="13%">२३</td></tr>            <tr class="tr-week"><td style="width:13%;">२४</td><td width="13%">२५</td><td width="13%">२६</td><td style="width:13%;background: url(img/imp_day.png);background-repeat:repeat-y;background-position:center center;background-attachment:scroll;background-size:100% 100%;">२७</td><td width="13%">२८</td><td width="13%">२९</td><td width="13%">३०</td></tr>');*/
        }
        event.handled = true;
    }
    return false;            
});

function updatecalendardata(idNumber){
    $('.tr-week').remove();
    var caltblid = idNumber == 2? "#caltb2":"#caltb";
    var monthdatelist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date")
    var monthobj = $(calerdarxml).find("calendar[id='"+ year + "'] >  month[id='"+month+"']");
    $('.div-selected-month').text(function(i, oldText) {
        return monthobj.attr("dn");
    });
    
     for(var i = 0 ; i< 5;i++){
    $(caltblid).append('<tr class="tr-week"><td id="td0'+ i +'" width="13%"></td>     <td id="td1'+ i +'" width="13%"></td><td id="td2'+ i +'" width="13%"></td><td id="td3'+ i +'" width="13%"></td><td id="td4'+ i +'" width="13%"></td><td id="td5'+ i +'" width="13%"></td><td id="td6'+ i +'" width="13%"></td></tr>');
    }
    
    var lastSelectedtd = null;
    var datedatacolid = idNumber == 2? "#datedatacol2":"#datedatacol";
    $( "td").click(function() {
        $(datedatacolid).find("div").each(function(){
             $(this).remove();                              
        });
        if(lastSelectedtd != null){   $(lastSelectedtd).removeAttr("style"); }
        $(this).attr("style",'border-style: solid;border-color:#f6883d;border-width: 1px;');
        lastSelectedtd = $(this);
        var dateval = $(this).text();
        var datalist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date[dn='"+ dateval +"'] > d")
        $(datalist).each(function(){
            var tagstr = $(this).attr("tag");
            var divstyle = (!(jQuery.type(tagstr) === "undefined") && tagstr.indexOf("NAX") != -1) ? " style='color:green;'" : "";
            var divstr = "<div"+ divstyle +">";
            divstr += $(this).text() +"</div>" ;
            $(datedatacolid).append(divstr);
        });
        
    });
    
    var y=0;
    $(monthdatelist).each(function(){
        var wkday = $(this).attr("wd");
        var cell = $("#td"+ wkday + y +"");
        cell.text($(this).attr("dn"));
        
        if(wkday == 6){ y += 1;}
        if(y == 5){ y = 0;}
        
    });   
}

function getcalfooterheight(calheaderid){
    var docht = $(document).height();
    var calheaderht = $(calheaderid).height();
    return docht - (calheaderht + 240 + 25); //documentheight -(calendar header height + calendar content height - buffer)
}
$( document ).on( "pageinit", "#maincalender", function() {
    $("#calfooter").height(getcalfooterheight("#calheader"));
    loadCalendar();
});
$( document ).on( "pageinit", "#maincalender2", function() {
    $("#calfooter2").height(getcalfooterheight("#calheader2"));
    loadCalendar();
});

function loadCalendar(){
    if(calerdarxml != null && weekday != null){ return;  }
    $.ajax({
    type: "GET",
    url: "data/calendar-data.xml",
    dataType: "xml",
    success: function(xml){
        var wdc=0;
        weekday = new Array(7);
        $(xml).find("wd-data > wd").each(function(){
            weekday[wdc] = $(this).text();
            wdc += 1;
        })
        calerdarxml = xml;
        loadData(xml);
    },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });  
}

function loadData(xml){
    var yearObj = $(xml).find("calendar[id='"+ year + "']");
    var yearName = $(yearObj).attr("dn");
    var monthObj = $(yearObj).find("month[id='"+ month + "']");
    var monthName = $(monthObj).attr("dn");
    $('.div-selected-month').text(function(i, oldText) {
        return monthName;
    });
    updatecalendardata();
}
        
/*function daysInMonth(month,year,day) {
    var date = new Date(year, month, day);
    return date.getDate(); 
}*/
