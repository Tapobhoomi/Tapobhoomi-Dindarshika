var year = 2017;
var month = 1;
var panchmonth = 1;
var currentday = 20;
var currentmonth = 1;
var weekday = null;
var monthcolorcode = null;
var calerdarxml = null;
var panchangxml = null;
//var prevselmonth = 0;

var panchangdatatag= {};
var calUIdata1 = {"id":"1","theme-color":"#f6883d","currentday-class":"calerdar-currentdate","header-bgimage":"calendar-header-bgimage","header-class":"calendar-theme","selected-year":2017,"selected-month":1,"selected-date":1,"current-year":2017,"current-month":1,"current-date":1};
var calUIdata2 = {"id":"2","theme-color":"#db9c5d","currentday-class":"panchang-currentdate","header-bgimage":"panchang-header-bgimage","header-class":"panchang-theme","selected-year":2017,"selected-month":1,"selected-date":1,"current-year":2017,"current-month":1,"current-date":1};
var calUIdata = calUIdata1;
var calPrevUIdata = calUIdata1;

/*$(document).on('swipeleft', '[id="calcontent"]', function(event){    
    var months = $(calerdarxml).find("calendar[id='"+ year + "'] > month");
    if(months.length > month){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: false}, true, true);  
        nextmonth();
    }    
    return false;         
});
$(document).on('swiperight', '[id="calcontent"]', function(event){   
    if(month > 1){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: true}, true, true);
        prevmonth();
    }
    return false;            
});*/

var panchangimgtopimg = 0;
function pospanchangimg(){
    if(panchangimgtopimg == 0){
        var panheight = $(".panzoom-elements").height();
        var height = $(".panzoom-elements > img").height();
        if(height == 0){
            height = $(".panzoom-elements > img").css("height");
        }
        panchangimgtopimg = (panheight - height) / 2
    }
    $(".panzoom-elements > img").css("margin-top",panchangimgtopimg+"px");
}

/*
$( document ).on( "pageshow", "#panchangpage", function() {
    pospanchangimg();
});
$( document ).on( "pageinit", "#panchangpage", function() {
    $(".panzoom-elements").panzoom({ });    
    //var img = document.getElementById('panchangimage'); 
    //$(".panzoom-elements > img").attr("src","img/panchang/"+panchmonth+".jpg");
    //$(".panzoom-elements > img").css("margin-top","100px");
    var height = $(document).height();
    $(".panzoom-elements").css("height",height - (45 + 90) );
    
    updateCurrentPachMonth(panchmonth);
    $("#footerrightnavimgid").click(function(){
        if(panchmonth == 3){ return;}
        panchmonth += 1;
        updateCurrentPachMonth(panchmonth);
        pospanchangimg();
    })
    $("#footerleftnavimgid").click(function(){
        if(panchmonth == 1){ return;}
        panchmonth -= 1;        
        updateCurrentPachMonth(panchmonth);
        pospanchangimg();
    })
});

function updateCurrentPachMonth(panchmonth){   
    var width = $(document).width();    
    //var headerht = $("#panchangheader").height();
    //var footerht = $("#panchangfooter").height();
    //$(".panzoom-elements > img").attr("width",width);
    
    var monthObj = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+ panchmonth + "']");
    var monthName = $(monthObj).attr("dn"); 
    $("#panchselectedmonth").text(function(i, oldText) {
        return monthName;
    });
    $(".panzoom-elements").children().remove();
    $(".panzoom-elements").append("<img src='img/panchang/"+panchmonth+".jpg' width='"+width+"px height='auto' style='margin-left:-15px;' />");
    
}*/

function nextmonth(){
    var months = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month");
    if(months.length > calUIdata["selected-month"]){
        calUIdata["selected-month"] += 1;
        updatecalendardata();
    }
}

function prevmonth(){
    if(calUIdata["selected-month"] > 1){
        calUIdata["selected-month"] -= 1;
        updatecalendardata();
    }
}

function updatecalendardata(){
    //if(prevselmonth > 0){
       // $('#calheader').removeClass("month"+ prevselmonth +"-theme");
    //}    
    //$('#calheader').addClass("month"+ month +"-theme");
    $('#caldivider').css("background",monthcolorcode[calUIdata["selected-month"]-1]);
    //$('#datahdr').css("background","#e7b149");
    $('#calheader').addClass("calendar-theme");
    $('#caltb').find('tr').remove();
    var monthdatelist = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date")
    var monthobj = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] >  month[id='"+calUIdata["selected-month"]+"']");
    $('.div-selected-month').text(function(i, oldText) {
        return monthobj.attr("dn");
    });
    
    var monthaddata = "";
    monthobj.find("odata > d").each(function(){
        monthaddata += $(this).text() + " | "
    });
    $('#caldivider').text(monthaddata);
     for(var i = 0 ; i< 5;i++){
    $("#caltb").append('<tr height="'+caltddim+'px"><td id="td0'+ i +'" width="'+caltddim+'px"></td>     <td id="td1'+ i +'" width="'+caltddim+'px"></td><td id="td2'+ i +'" width="'+caltddim+'px"></td><td id="td3'+ i +'" width="'+caltddim+'px"></td><td id="td4'+ i +'" width="'+caltddim+'px"></td><td id="td5'+ i +'" width="'+caltddim+'px"></td><td id="td6'+ i +'" width="'+caltddim+'px"></td></tr>');
    }
    
   
    $("#caltb").find("td").click(function() {        
        var dateval = $(this).attr("id");
        selectdate(dateval); 
        //hideNav("#calnavleft",-30);hideNav("#calnavright",30);
        
    });
    
    var panchangmonthdatelist = $(panchangxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date");
    var y=0;
    $(monthdatelist).each(function(){
        var wkday = $(this).attr("wd");
        var cell = $("#td"+ wkday + y +"");
        cell.append('<div id="datevalue"></div><div id="imgdiv"><img src="img/mn/'+$(this).attr("id")+'.png" width="55%" height="auto"/></div>');
        $(cell).attr("id",$(this).attr("id"));
        
        if(calUIdata["current-month"] == calUIdata["selected-month"] && calUIdata["current-date"] == $(this).attr("id")){
            $(cell).removeClass(calPrevUIdata["currentday-class"]);
            $(cell).addClass(calUIdata["currentday-class"]);
            $(cell).attr("style",'width:' + (caltddim - 10) +'px; height:' + (caltddim - 10)+'px;');  
        }
       // var ismncylce = false;
        if(!($(this).attr("mncycle") === undefined)){
                if($(this).attr("mncycle") == 0){
                    $(cell).find('#datevalue').attr("style",'background:black;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }else if($(this).attr("mncycle") == 1){
                    $(cell).find('#datevalue').attr("style",'background:white;border: 1px solid grey;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }
                $(cell).find('#imgdiv').attr("style","position: relative;top:-"+ (caltddim/8) +"px");
               // ismncylce = true;
        }
        if(calUIdata["id"] == 2){
            var shubday = $(panchangxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date[id='"+$(this).attr("id")+"'] > shub-day");
            var shubdaytypeval = $(shubday).attr("type");
            if(!(shubdaytypeval === undefined)){
                var shubdaybgcolor = "red";            
                if(!(shubdaytypeval === undefined) && parseInt(shubdaytypeval) <= 3) {
                    shubdaybgcolor = "green";
                }
                var subdaydivheight = 2;
                $(cell).find('#imgdiv').append('<div style="background:'+shubdaybgcolor+';width:70%; height:'+subdaydivheight+'px;margin-left:15%;opacity: 0.2;"></div>');
            }
        }
        if(wkday == 6){ y += 1;}
        if(y == 5){ y = 0;}        
    });   
    selectdate("1"); 
    $("#caltb").find("td").on('swiperight', function(event){ 
        return oncalswiperight();
    });
    $("#caltb").find("td").on('swipeleft', function(event){  
        return oncalswipeleft();
    });
    $('#calcontent').focus();
}

 var lastSelectedtd = null;
function selectdate(id){
    if(!(id === undefined) && id != "" && parseInt(id, 10) > 0){
        var datetd = $("#caltb").find("td[id='"+ id +"']");
        $("#datedatacol").find("div").each(function(){
         $(this).remove();                              
        });
        if(lastSelectedtd != null && !(calUIdata["current-month"] == calUIdata["selected-month"] && calUIdata["current-date"] == $(lastSelectedtd).attr("id"))){  $(lastSelectedtd).removeAttr("style"); }
        if(!(calUIdata["current-month"] == calUIdata["selected-month"] && calUIdata["current-date"] == id)){
            $(datetd).attr("style",'border: 1px solid '+calUIdata["theme-color"]+';width:' + (caltddim - 10) +'px; height:' + (caltddim - 10) +'px;border-radius:50%;');
        }
        lastSelectedtd = $(datetd);

        if( "1" == calUIdata.id){
            var datalist = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date[id='"+ id +"'] > d");
            $(datalist).each(function(){
                var tagstr = $(this).attr("tag");
                var txtcolor = null;
                var imgfile = $(this).attr("img");
                var imgwidth = 40;
                var defstyle = "style='padding-right:5px'";
                var divstyle = "";
                if(!(jQuery.type(tagstr) === "undefined")){
                    if(tagstr.indexOf("NAX") != -1){ divstyle=" style='color:green;padding:1px !important;'";defstyle="";imgfile = "img/mn/"+id+".png";imgwidth=30;}
                    else if(tagstr.indexOf("SMU") != -1){ divstyle=" style='color:#f04115;padding:1px !important;'"}
                    else if(tagstr.indexOf("0") != -1){ divstyle = " style='color:red;padding:1px !important;font-size:large;font-weight: bold;'";}
                    else if(tagstr.indexOf("2") != -1){ divstyle=" style='color:red;padding:1px !important;'";}
                    else if(tagstr.indexOf("4") != -1){ divstyle=" style='color:#fb60ae;padding:1px !important;'";}
                }
                //var divstyle = (txtcolor != null) ? " style='color:"+txtcolor+";padding:1px !important'" : "";
                var divstr = "<div"+ divstyle +">";


                if(!(jQuery.type(imgfile) === "undefined")){
                    divstr += "<table width='100%'><tr><td>"+$(this).text()+"</td><td align='right'><img src='"+ imgfile +"' width='"+imgwidth+"px' height='auto' "+ defstyle +"/></td></tr></table>"
                }else{
                    divstr += $(this).text();
                }
                divstr +="</div>" ;
                $("#datedatacol").append(divstr);
            });
        }else if("2" == calUIdata.id){
            var datalist = $(panchangxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date[id='"+ id +"']").children();
            $(datalist).each(function(){
                var datatag = $(this).prop("tagName");
                if(!(panchangdatatag[datatag] === undefined)){
                    var pnchdata = "<b>" + panchangdatatag[datatag]  + "</b> : " + $(this).text();
                    var divstr = "<div>"+ pnchdata + "</div>";
                    if(datatag == "ti"){
                        divstr = "<div><table width='100%'><tr><td>"+pnchdata+"</td><td align='right'><img src='img/mn/"+id+".png' width='30px' height='auto'/></td></tr></table></div>"
                    }
                    $("#datedatacol").append(divstr);
                }
            });            
        }
    }
}

var caltddim = 0;
function calculatedimensions(){
    var docht = $(document).height();
    var docwd = $(document).width();
    var calheaderht = 80;
    
    var selectedyearfontsz = "0.9em";
    var selectedmonthfontsz = "1.6em";
    var calweeknamesfontsz = "1.1em";
    var diff= 80;
    if(docwd > 420 && docwd < 440){
        selectedmonthfontsz = "1.6em";
        selectedyearfontsz = "0.9em";
        calweeknamesfontsz = "1.1em";
    }else if(docwd >= 440 && docwd < 460){
        calheaderht += 10
        selectedmonthfontsz = "1.7em";
        selectedyearfontsz = "0.95em";
        calweeknamesfontsz = "1.15em";
        diff += 5;
    }else if(docwd >= 460 && docwd < 480){
        calheaderht += 10
        selectedmonthfontsz = "1.8em";
        selectedyearfontsz = "1em";
        calweeknamesfontsz = "1.2em";
        diff += 5;
    }else if(docwd >= 480 && docwd < 500){
        calheaderht += 20
        selectedmonthfontsz = "1.9em";
         selectedyearfontsz = "1.1em";
        calweeknamesfontsz = "1.3em";
        diff += 10;
    }else if(docwd >= 500){
        calheaderht += 30
        selectedyearfontsz = "1.2em";
        selectedmonthfontsz = "2em";
        calweeknamesfontsz = "1.4em";
        diff += 20;
    }
    
    $("#calweeknames").css("font-size",calweeknamesfontsz);
    $(".div-selected-year").css("font-size",selectedyearfontsz);
    $("#selectedmonth").css("font-size",selectedmonthfontsz)
    $("#calheader").css("height",(calheaderht) + "px !important");
    //calheaderht = $("#calheader").height();
    caltddim = (docwd/7) - 5;
    var calcontentheight = (caltddim * 5);
    //$("#calcontent").height(calcontentheight);
    var footerheight =  docht - (diff + calcontentheight + 20); //documentheight -(calendar header height + calendar content height - buffer)
    $("#calfooter").height(footerheight);
    $("#datedatacol").height(footerheight - 44);
    
    var navheight = (calcontentheight+20);
    /*$("#calnavleft").css("height",navheight+"px");
    $("#calnavright").css("height",navheight+"px");
    $("#calnavleft").css("margin-top","-"+(navheight-10)+"px");
    $("#calnavright").css("margin-top","-"+(navheight)+"px");
    $("#calnavright").css("margin-left",docwd-30+"px");
    $("#righnavimgid").css("margin-top",((navheight/2)-30)+"px");
    $("#leftnavimgid").css("margin-top",((navheight/2)-30)+"px");*/
    
    
}

$( document ).on( "pageinit", "#landingpage", function() {
    loadCalendar();
});

$( document ).on( "pageinit", "#maincalender", function() {
    calculatedimensions();    
    createFinderMenu("#findermenulist");    
    loadData(calerdarxml);
    
    $('#calheader').addClass("month"+ month +"-theme");
    
    /*8$("#calnavleft").find("img").click(function() {
        prevmonth();
    });
    $("#calnavright").find("img").click(function() {
        nextmonth();
    });*/
    
});

function createFinderMenu(findermenuid){
    $(calerdarxml).find("calendar[id='"+ year + "'] > tag-data > tag").each(function(){
        if(!($(this).attr("dn") === undefined)){
            $(findermenuid).append("<a href='#finder-page' data-role='button' class='menu-item ui-btn sriguru-ui-background text-shadow-none find-menu-item' style='color:black' data-theme='b' id='find"+ $(this).attr("id")+ "'>"+ $(this).attr("dn")+"</a>");

        }
    });
}



function showcalender(){
    calPrevUIdata = calUIdata;
    calUIdata = calUIdata1;
    updateHeaderClass();
    $('#calfinderpanel').show();
    updatecalendardata();
}

function showpanchang(){
    calPrevUIdata = calUIdata;
    calUIdata = calUIdata2;
    updateHeaderClass();
    $('#calfinderpanel').hide();
    updatecalendardata();
}

function updateHeaderClass(){
    $('#calheader').removeClass(calPrevUIdata["header-class"])
    $('#calheader').removeClass(calPrevUIdata["header-bgimage"])
    $('#calheader').addClass(calUIdata["header-class"]);
    $('#calheader').addClass(calUIdata["header-bgimage"]);
}

$( document ).on( "pageinit", "#finder-page", function() {
    createFinderMenu("#findermenulist2");
    findermenuonclick();
});

$( document ).on( "pageinit", "#educationpage", function() {
    /* $("#btnedumore").on("click", function() {
    if (typeof navigator !== "undefined" && navigator.app) {
        // Mobile device.
        alert("navigate");
        window.open("http://www.google.com", '_self ', 'location=yes');
        //navigator.app.loadUrl('http://srigurudev.org/edu-activities', {openExternal: true});
    } else {
        // Possible web browser
        alert("Window open");
        window.open("http://srigurudev.org/edu-activities", "_blank");
    }
    });
    
   $("#btneduandmore").on("click", function() {
    if (typeof navigator !== "undefined" && navigator.app) {
        // Mobile device.
        alert("navigate2");
        //navigator.app.loadUrl('http://www.google.com', {openExternal: true});
        window.open("http://www.google.com", "_blank");
    } else {
        // Possible web browser
        alert("Window open");
       window.open("http://srigurudev.org/edu-activities", '_self ', 'location=yes');
    }
    });*/
});

function oncalswiperight(){
    if(calUIdata["selected-month"] > 1){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: true}, true, true);
        prevmonth();
    }
    //showNav("#calnavleft",-30);showNav("#calnavright",30);
    return false;     
}

function oncalswipeleft(){
    var months = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month");
    if(months.length > calUIdata["selected-month"]){
       // $.mobile.changePage("#maincalender", {transition: "slide", reverse: false}, true, true);  
        nextmonth();
    }    
    //showNav("#calnavleft",-30);showNav("#calnavright",30);
    return false;
}

function hideNav(divid,move){
    if($(divid).is(':visible')){$(divid).css({"left":"0px"}).animate({"left":move+"px"}, "slow",function(){
             $(divid).hide(); });}
}

function showNav(divid,move){
    if(!$(divid).is(':visible')){$(divid).show();$(divid).css({"left":move+"px"}).animate({"left":"0px"}, "slow");}    
}

function loadCalendar(){
    if(calerdarxml != null && weekday != null){ return;  }
    
    monthcolorcode = new Array(12);
    monthcolorcode[0]="#fb60ae";monthcolorcode[1]="#fb6068";monthcolorcode[2]="#df88f0";monthcolorcode[3]="#37ddd0";
    monthcolorcode[4]="#f68c3d";monthcolorcode[5]="#f6c83d";monthcolorcode[6]="#f6183d";monthcolorcode[7]="#f6683d";
    monthcolorcode[8]="#16883d";monthcolorcode[9]="#46883d";monthcolorcode[10]="#86883d";monthcolorcode[11]="#d6883d";
    
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
    },
    error: function() {
        alert("An error occurred while processing calendar XML file.");
    }
    }); 
    
    $.ajax({
    type: "GET",
    url: "data/panchang-data.xml",
    dataType: "xml",
    success: function(xml){
        $(xml).find("calendar > data-tag").children().each(function(){
            panchangdatatag[$(this).prop("tagName")] = $(this).text();
        });
        panchangxml = xml;        
    },
    error: function() {
        alert("An error occurred while processing panchang XML file.");
    }
    }); 
    
    /*$.ajax({
        type: "GET",
        url : "http://www.thomas-bayer.com/sqlrest/CUSTOMER/3/",
        dataType : 'xml',
        success : function(data){
            alert(data);
        },
        error : function(XMLHttpRequest,textStatus, errorThrown) {   
            alert("Something wrong happended on the server. Try again..");  
 
        }
    });*/
}

function loadData(xml){
    var yearObj = $(xml).find("calendar[id='"+ calUIdata["current-year"] + "']");
    var yearName = $(yearObj).attr("dn");
    var monthObj = $(yearObj).find("month[id='"+ calUIdata["current-month"] + "']");
    var monthName = $(monthObj).attr("dn"); 
    //$("#selectedmonth").append('<img src="img/mn/monthname/'+month+'.png" width="auto" height="100%"/>');
    $('.div-selected-month').text(function(i, oldText) {
        return monthName;
    });
    updatecalendardata();
    
    $(xml).find("calendar[id='"+ calUIdata["selected-year"]  + "'] > month").each(function(){
        $("#monthmenulist").append("<a href='#menuPanel' data-role='button' data-rel='close' class='menu-item ui-btn sriguru-ui-background text-shadow-none' style='color:black' data-theme='b' id='mn"+ $(this).attr("id") +"'>"+ $(this).attr("dn")+"</a>")
        $("#mn"+$(this).attr("id") ).click(function(){
            var selectedmn = parseInt($(this).attr("id").replace("mn",""), 10);
            if(calUIdata["selected-month"] != selectedmn){
                //prevselmonth = month;
                calUIdata["selected-month"] = selectedmn;
                updatecalendardata();
            }
            
        });
    })
    
    findermenuonclick();
                               
}

function findermenuonclick(){
    $(".find-menu-item").click(function(){
       $("#finderhdrtxt").text($(this).text());
       $("#findercontent").children().remove();
        var tagid = $(this).attr("id").replace("find","");
       $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month > date > d*[tag='"+tagid+"']").each(function(){
           divstr = $(this).text();
           var imgfile = $(this).attr("img");
           if(!(jQuery.type(imgfile) === "undefined")){
            divstr = "<table width='100%'><tr><td>"+$(this).text()+"</td><td><img src='"+ imgfile +"' width='40px' height='auto'/></td></tr></table>"
           }
           $("#findercontent").append("<div style='padding:5px;'><table width='100%'><tr><td width='20%' style='text-align:center'><div width='100%'><div style='background-color:"+monthcolorcode[$(this).parent().parent().attr("id") - 1]+";color:white;padding: 5px;border-top-left-radius: 10px;'>"+$(this).parent().parent().attr("dn") + "</div><div style='background-color:#f2e9d9;padding: 5px;border-bottom-left-radius: 10px;'><img src='img/mn/"+$(this).parent().attr("id")+".png' width='25%' height='auto'/></div></div></td><td width='80%' style='background-color:#f2e9d9;padding: 5px;'>"+divstr+"</td></tr></table></div>")
       });
    });
}
