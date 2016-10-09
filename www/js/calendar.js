var year = 2016;
var month = 1;
var weekday = null;
var monthcolorcode = null;
var calerdarxml = null;
var prevselmonth = 0;

$(document).on('swipeleft', '[data-role="page"]', function(event){    
    var months = $(calerdarxml).find("calendar[id='"+ year + "'] > month");
    if(months.length > month){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: false}, true, true);  
        nextmonth();
    }    
    return false;         
});
$(document).on('swiperight', '[data-role="page"]', function(event){   
    if(month > 1){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: true}, true, true);
        prevmonth();
    }
    return false;            
});

function nextmonth(){
    var months = $(calerdarxml).find("calendar[id='"+ year + "'] > month");
    if(months.length > month){
        prevselmonth = month;
        month += 1;
        updatecalendardata();
    }
}

function prevmonth(){
    if(month > 1){
        prevselmonth = month;
        month -= 1;
        updatecalendardata();
    }
}

function updatecalendardata(){
    if(prevselmonth > 0){
        $('#calheader').removeClass("month"+ prevselmonth +"-theme");
        $('#calheader').addClass("month"+ month +"-theme");
    }
    $('.tr-week').remove();
    var monthdatelist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date")
    var monthobj = $(calerdarxml).find("calendar[id='"+ year + "'] >  month[id='"+month+"']");
    $('.div-selected-month').text(function(i, oldText) {
        return monthobj.attr("dn");
    });
    
     for(var i = 0 ; i< 5;i++){
    $("#caltb").append('<tr class="tr-week"><td id="td0'+ i +'" width="13%"></td>     <td id="td1'+ i +'" width="13%"></td><td id="td2'+ i +'" width="13%"></td><td id="td3'+ i +'" width="13%"></td><td id="td4'+ i +'" width="13%"></td><td id="td5'+ i +'" width="13%"></td><td id="td6'+ i +'" width="13%"></td></tr>');
    }
    
    var lastSelectedtd = null;
    $(".tr-week > td").click(function() {
        
        var dateval = $(this).text();
        if(!(dateval === undefined) && dateval != ""){
            $("#datedatacol").find("div").each(function(){
             $(this).remove();                              
            });
            if(lastSelectedtd != null){   $(lastSelectedtd).removeAttr("style"); }
            $(this).attr("style",'border-style: solid;border-color:' + monthcolorcode[month-1] +';border-width: 1px;');
            lastSelectedtd = $(this);
            
            var datalist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date[dn='"+ dateval +"'] > d")
            $(datalist).each(function(){
                var tagstr = $(this).attr("tag");
                var divstyle = (!(jQuery.type(tagstr) === "undefined") && tagstr.indexOf("NAX") != -1) ? " style='color:green;'" : "";
                var divstr = "<div"+ divstyle +">";
                divstr += $(this).text() +"</div>" ;
                $("#datedatacol").append(divstr);
            });
        }
        
        
        
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
    var footerheight = getcalfooterheight("#calheader");
    $("#calfooter").height(footerheight);
    $("#datedatacol").height(footerheight - 80);
    loadCalendar();
});

function loadCalendar(){
    if(calerdarxml != null && weekday != null){ return;  }
    
    monthcolorcode = new Array(12);
    monthcolorcode[0]="#f6883d";monthcolorcode[1]="#f6887d";monthcolorcode[2]="#f6183d";monthcolorcode[3]="#16883d";
    monthcolorcode[4]="#f68c3d";monthcolorcode[5]="#f6c83d";monthcolorcode[6]="#f6183d";monthcolorcode[7]="#f6683d";
    monthcolorcode[8]="#16883d";monthcolorcode[9]="#46883d";monthcolorcode[10]="#86883d";monthcolorcode[11]="#d6883d";
    
    $("#prevcalmonth").click(function() {
        prevmonth();
    });
    $("#nextcalmonth").click(function() {
        nextmonth();
    });
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
