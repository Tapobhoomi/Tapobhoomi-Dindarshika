var year = 2016;
var month = 1;
var currentday = 20;
var currentmonth = 1;
var weekday = null;
var monthcolorcode = null;
var calerdarxml = null;
var prevselmonth = 0;

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
$( document ).on( "pageinit", "#panchangpage", function() {
    $(".panzoom-elements").panzoom({ });
});
/*
$( document ).on( "pageinit", "#testpage", function() {
var sliderorder=["#div1","#div2","#div3"];
$("#testcontent").on('swiperight', function(event){  
    $(sliderorder[0]).animate({left: '350px'},"slow",function(){
        
        //$(sliderorder[1]).attr("style",order1style);
        $(sliderorder[1]).css("margin-left","-350px");
        $(sliderorder[1]).css("left","0px");
        $(sliderorder[1]).css("z-index",3);
        $(sliderorder[0]).css("z-index",1);
        //$(sliderorder[1]).css("background-color",color);
        var order1 = sliderorder[0];
        sliderorder[0] = sliderorder[1];
        sliderorder[1] = order1;
    });
});
$("#testcontent").on('swipeleft', function(event){  
    //var leftval = "220px" 
   // top: 35px;left: 220px; background-color: green; height: 100px; width:104px; z-index: 1; position: relative; margin-top: -100px;
        $(sliderorder[2]).animate({left: '0px'},"slow",function(){
            //$(sliderorder[1]).attr("style",order1style);
            $(sliderorder[1]).css("margin-left","0px");
            $(sliderorder[1]).css("left","350px");
            $(sliderorder[1]).css("z-index",3);
            $(sliderorder[2]).css("z-index",1);
            //$(sliderorder[1]).css("background-color",color);
            var order1 = sliderorder[2];
            sliderorder[2] = sliderorder[1];
            sliderorder[1] = order1;
        });
});
});
*/

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
    //if(prevselmonth > 0){
       // $('#calheader').removeClass("month"+ prevselmonth +"-theme");
    //}    
    //$('#calheader').addClass("month"+ month +"-theme");
    $('#caldivider').css("background",monthcolorcode[month-1]);
    //$('#datahdr').css("background","#e7b149");
    $('#calheader').addClass("month1-theme");
    $('#caltb').find('tr').remove();
    var monthdatelist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date")
    var monthobj = $(calerdarxml).find("calendar[id='"+ year + "'] >  month[id='"+month+"']");
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
       /* if($("#calnavleft").is(':visible')){
         $("#calnavleft").css({"left":"0px"}).animate({"left":"-30px"}, "slow",function(){
             $("#calnavleft").hide(); });} else{ $("#calnavleft").show();        $("#calnavleft").css({"left":"-30px"}).animate({"left":"0px"}, "slow");  }
        
        if($("#calnavright").is(':visible')){ $("#calnavright").css({"left":"0px"}).animate({"left":"30px"}, "slow",function(){
             $("#calnavright").hide();});} else{$("#calnavright").show();$("#calnavright").css({"left":"30px"}).animate({"left":"0px"}, "slow");  }*/
        hideNav("#calnavleft",-30);hideNav("#calnavright",30);
        //showNav("#calnavleft",-30);showNav("#calnavright",30);
        
    });
    
    var y=0;
    $(monthdatelist).each(function(){
        var wkday = $(this).attr("wd");
        var cell = $("#td"+ wkday + y +"");
        cell.append('<div id="datevalue"></div><div id="imgdiv"><img src="img/mn/'+$(this).attr("id")+'.png" width="55%" height="auto"/></div>');
        $(cell).attr("id",$(this).attr("id"));
        
        if(currentmonth == month && currentday == $(this).attr("id")){
            $(cell).attr("style",'background:#f6883d;width:' + (caltddim - 10) +'px; height:' + (caltddim - 10)+'px;border-radius:50%;');            
            //background-color:' + monthcolorcode[month-1] +';
        }
        if(!($(this).attr("mncycle") === undefined)){
                if($(this).attr("mncycle") == 0){
                    $(cell).find('#datevalue').attr("style",'background:black;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }else if($(this).attr("mncycle") == 1){
                    $(cell).find('#datevalue').attr("style",'background:white;border: 1px solid grey;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }
                $(cell).find('#imgdiv').attr("style","position: relative;top:-"+ (caltddim/8) +"px");
        }
        if(wkday == 6){ y += 1;}
        if(y == 5){ y = 0;}        
    });   
    selectdate("1"); 
    $('#calcontent').focus();
}

 var lastSelectedtd = null;
function selectdate(id){
    if(!(id === undefined) && id != "" && parseInt(id, 10) > 0){
        var datetd = $("#caltb").find("td[id='"+ id +"']");
        $("#datedatacol").find("div").each(function(){
         $(this).remove();                              
        });
        if(lastSelectedtd != null && !(currentmonth == month && currentday == $(lastSelectedtd).attr("id"))){  $(lastSelectedtd).removeAttr("style"); }
        if(!(currentmonth == month && currentday == id)){
            //$(datetd).attr("style",'border-style: solid;border-color:' + monthcolorcode[month-1] +';border-width: 0.5px;');
            $(datetd).attr("style",'border: 1px solid #f6883d;width:' + (caltddim - 10) +'px; height:' + (caltddim - 10) +'px;border-radius:50%;');
        }
        lastSelectedtd = $(datetd);

        var datalist = $(calerdarxml).find("calendar[id='"+ year + "'] > month[id='"+month+"'] > date[id='"+ id +"'] > d")
        $(datalist).each(function(){
            var tagstr = $(this).attr("tag");
            var txtcolor = null;
            if(!(jQuery.type(tagstr) === "undefined")){
                if(tagstr.indexOf("NAX") != -1){ txtcolor="green";}
                else if(tagstr.indexOf("SMU") != -1){ txtcolor="#f04115";}
                else if(tagstr.indexOf("0") != -1){ txtcolor="red";}
                else if(tagstr.indexOf("2") != -1){ txtcolor="red";}
            }
            var divstyle = (txtcolor != null) ? " style='color:"+txtcolor+";padding:1px !important'" : "";
            var divstr = "<div"+ divstyle +">";
            
            var imgfile = $(this).attr("img");
            if(!(jQuery.type(imgfile) === "undefined")){
                divstr += "<table width='100%'><tr><td>"+$(this).text()+"</td><td><img src='"+ imgfile +"' width='40px' height='auto'/></td></tr></table>"
            }else{
                divstr += $(this).text();
            }
            divstr +="</div>" ;
            $("#datedatacol").append(divstr);
        });
    }
}

var caltddim = 0;
function calculatedimensions(){
    var docht = $(document).height();
    var docwd = $(document).width();
    var calheaderht = $("#calheader").height();
    caltddim = (docwd/7) - 5;
    var calcontentheight = (caltddim * 5);
    //$("#calcontent").height(calcontentheight);
    var footerheight =  docht - (calheaderht + calcontentheight + 20); //documentheight -(calendar header height + calendar content height - buffer)
    $("#calfooter").height(footerheight);
    $("#datedatacol").height(footerheight - 44);
    
    var navheight = (calcontentheight+20);
    $("#calnavleft").css("height",navheight+"px");
    $("#calnavright").css("height",navheight+"px");
    $("#calnavleft").css("margin-top","-"+(navheight-10)+"px");
    $("#calnavright").css("margin-top","-"+(navheight)+"px");
    $("#calnavright").css("margin-left",docwd-30+"px");
    $("#righnavimgid").css("margin-top",((navheight/2)-30)+"px");
    $("#leftnavimgid").css("margin-top",((navheight/2)-30)+"px");
}

$( document ).on( "pageinit", "#maincalender", function() {
    calculatedimensions();
    
    loadCalendar();
    $("#calcontent").on('swiperight', function(event){  
        if(month > 1){
           // $.mobile.changePage("#maincalender", {transition: "slide", reverse: true}, true, true);
            prevmonth();
        }
        showNav("#calnavleft",-30);showNav("#calnavright",30);
        return false;        
    });
    $("#calcontent").on('swipeleft', function(event){  
        var months = $(calerdarxml).find("calendar[id='"+ year + "'] > month");
        if(months.length > month){
           // $.mobile.changePage("#maincalender", {transition: "slide", reverse: false}, true, true);  
            nextmonth();
        }    
        showNav("#calnavleft",-30);showNav("#calnavright",30);
        return false;
    });    
    
});

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
    $('#calheader').addClass("month"+ month +"-theme");
    //$("#currentdate > img").remove();
    //$("#currentdate").attr("style",'background-color:' + monthcolorcode[currentmonth-1] +';');
    //$("#currentdate").append('<img src="img/mn/'+ currentday +'.png" width="auto" height="20%"/>');
    /*$("#prevcalmonth").click(function() {
        prevmonth();
    });
    $("#nextcalmonth").click(function() {
        nextmonth();
    });*/
    $("#calnavleft").find("img").click(function() {
        prevmonth();
    });
    $("#calnavright").find("img").click(function() {
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
    //$("#selectedmonth").append('<img src="img/mn/monthname/'+month+'.png" width="auto" height="100%"/>');
    $('.div-selected-month').text(function(i, oldText) {
        return monthName;
    });
    updatecalendardata();
    
    $(xml).find("calendar[id='"+ year + "'] > month").each(function(){
        $("#monthmenulist").append("<a href='#menuPanel' data-role='button' data-rel='close' class='menu-item ui-btn sriguru-ui-background text-shadow-none' style='color:black' data-theme='b' id='mn"+ $(this).attr("id") +"'>"+ $(this).attr("dn")+"</a>")
        $("#mn"+$(this).attr("id") ).click(function(){
            var selectedmn = parseInt($(this).attr("id").replace("mn",""), 10);
            if(month != selectedmn){
                prevselmonth = month;
                month = selectedmn;
                updatecalendardata();
            }
            
        });
    })
    
    $(".find-menu-item").click(function(){
       $("#finderhdrtxt").text($(this).text());
       $("#findercontent").children().remove();
        var tagid = $(this).attr("id").replace("find","");
       $(calerdarxml).find("calendar[id='"+ year + "'] > month > date > d*[tag='"+tagid+"']").each(function(){
            //alert($(this).text()) 
           /*$("#findercontent").append("<div style='padding:10px;'><table width='100%' class='date-div'><tr><td width='30%' style='text-align:center'>"+$(this).parent().parent().attr("dn") + " " + $(this).parent().attr("dn")+"</td><td width='70%'>"+$(this).text()+"</td></tr></table></div>")*/
           divstr = $(this).text();
           var imgfile = $(this).attr("img");
           if(!(jQuery.type(imgfile) === "undefined")){
            divstr = "<table width='100%'><tr><td>"+$(this).text()+"</td><td><img src='"+ imgfile +"' width='40px' height='auto'/></td></tr></table>"
           }
           $("#findercontent").append("<div style='padding:5px;'><table width='100%'><tr><td width='20%' style='text-align:center'><div width='100%'><div style='background-color:"+monthcolorcode[$(this).parent().parent().attr("id") - 1]+";color:white;padding: 5px;border-top-left-radius: 10px;'>"+$(this).parent().parent().attr("dn") + "</div><div style='background-color:#f2e9d9;padding: 5px;border-bottom-left-radius: 10px;'><img src='img/mn/"+$(this).parent().attr("id")+".png' width='25%' height='auto'/></div></div></td><td width='80%' style='background-color:#f2e9d9;padding: 5px;'>"+divstr+"</td></tr></table></div>")
       });
    });
                               
}
