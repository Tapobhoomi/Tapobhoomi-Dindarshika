var year = 2017;
var month = 1;
var weekday = null;
var monthcolorcode = null;
var calerdarxml = null;
var panchangxml = null;
//var prevselmonth = 0;
var todayDate = new Date();
var todaymonth = todayDate.getMonth()+1;
var todaydate = todayDate.getDate();


var panchangdatatag= {};
var calUIdata1 = {"id":"1","theme-color":"#ED3237","currentday-class":"calerdar-currentdate","header-bgimage":"calendar-header-bgimage","header-class":"calendar-theme","selected-year":2017,"selected-month-changed":false,"selected-month":todaymonth,"selected-date":todaydate,"current-year":2017,"current-month":1,"current-date":1,"disp-name":"CALENDAR"};
var calUIdata2 = {"id":"2","theme-color":"#ED3237","currentday-class":"panchang-currentdate","header-bgimage":"panchang-header-bgimage","header-class":"panchang-theme","selected-year":2017,"selected-month-changed":false,"selected-month":todaymonth,"selected-date":todaydate,"current-year":2017,"current-month":1,"current-date":1,"disp-name":"PANGHANG"};
var calUIdata = calUIdata1;
var calPrevUIdata = calUIdata1;

function nextmonth(){
    var months = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month");
    if(months.length > calUIdata["selected-month"]){
        calUIdata["selected-month"] += 1;
        calUIdata["selected-month-changed"] = true;
        updatecalendardata();
    }
}

function prevmonth(){
    if(calUIdata["selected-month"] > 1){
        calUIdata["selected-month"] -= 1;
        calUIdata["selected-month-changed"] = true;
        updatecalendardata();
    }
}

function updatecalendardata(){
     
    $("#cal-header-text").text(calUIdata["disp-name"]);
    $('#calheader').addClass("calendar-theme");
    $('#caltb').find('tr').remove();
    var monthdatelist = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date")
    var monthobj = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] >  month[id='"+calUIdata["selected-month"]+"']");
    $('#selectedmonth').text(function(i, oldText) {
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
        calUIdata["selected-month-changed"] = true;
        //hideNav("#calnavleft",-30);hideNav("#calnavright",30);
        
    });
    
    var panchangmonthdatelist = $(panchangxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date");
    var y=0;
    $(monthdatelist).each(function(){
        var wkday = $(this).attr("wd");
        var cell = $("#td"+ wkday + y +"");
        var dateimg = 'img/mn/'+$(this).attr("id")+'.png';
        var dateclass = "td-non-currentdate";
        var festivaldate = $(this).find("d[tag='0']");
        
        if(calUIdata["current-month"] == calUIdata["selected-month"] && calUIdata["current-date"] == $(this).attr("id")){
            $(cell).attr("style",'width:' + (caltddim - 10) +'px; height:' + (caltddim - 10)+'px;');  
            dateimg = 'img/mn/red/'+$(this).attr("id")+'.png';
            dateclass = "td-currentdate"
        }
        
        cell.append('<div id="datevalue"></div><div id="imgdiv" class="'+dateclass+'">'+$(this).attr("id")+'</div>');
        $(cell).attr("id",$(this).attr("id"));        
        
        
        if(!($(this).attr("mncycle") === undefined)){
                if($(this).attr("mncycle") == 0){
                    $(cell).find('#datevalue').attr("style",'background:black;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }else if($(this).attr("mncycle") == 1){
                    $(cell).find('#datevalue').attr("style",'background:white;border: 1px solid grey;width:' + (caltddim/4) +'px; height:' + (caltddim/4)+'px;border-radius:50%;position: relative;');
                }
                $(cell).find('#imgdiv').attr("style","position: relative;top:-"+ (caltddim/8) +"px");
               // ismncylce = true;
        }
        if(wkday == 6){ y += 1;}
        if(y == 5){ y = 0;}        
    });       
    
    if (calUIdata["selected-month-changed"]  == true){
        calUIdata["selected-date"] = 1;
    }
    selectdate(calUIdata["selected-date"]); 
    $("#caltb").find("td").on('swiperight', function(event){ 
        return oncalswiperight();
    });
    $("#caltb").find("td").on('swipeleft', function(event){  
        return oncalswipeleft();
    });
    $('#calcontent').focus();  
}

function getshubdaytypecolor(shubdaytypeval){
    var shubdaybgcolor = "rgba(255, 0, 0, 0.1)";            
    if(!(shubdaytypeval === undefined)){
        if(parseInt(shubdaytypeval) <= 3) {  shubdaybgcolor = "rgba(0, 255, 0, 0.1)";}
        else if(parseInt(shubdaytypeval) == 8){  shubdaybgcolor = "rgba(0, 0, 255, 0.1)";  }
    }
    return shubdaybgcolor;
}

function getshubdaytypecolorForSelect(shubdaytypeval){
    var shubdaybgcolor = "rgba(255, 0, 0, 0.3)";            
    if(!(shubdaytypeval === undefined)){
        if(parseInt(shubdaytypeval) <= 3) {  shubdaybgcolor = "rgba(0, 255, 0, 0.3)";}
        else if(parseInt(shubdaytypeval) == 8){  shubdaybgcolor = "rgba(0, 0, 255, 0.3)";  }
    }
    return shubdaybgcolor;
}

function getshubdaytypeval(id){
    var shubday = $(panchangxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date[id='"+id+"'] > shub-day");
    return $(shubday).attr("type");
}

 var lastSelectedtd = null;
function selectdate(id){
    if(!(id === undefined) && id != "" && parseInt(id, 10) > 0){
        var datetd = $("#caltb").find("td[id='"+ id +"']");
        $("#datedatacol").find("div").each(function(){
         $(this).remove();                              
        });
        
        if(lastSelectedtd != null){
            $(lastSelectedtd).removeClass("td-selection");
        }
        
        $(datetd).addClass("td-selection");
        lastSelectedtd = $(datetd);

        if( "1" == calUIdata.id){
            var datalist = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month[id='"+calUIdata["selected-month"]+"'] > date[id='"+ id +"'] > d");
            $(datalist).each(function(){
                var tagstr = $(this).attr("tag");
                var txtcolor = null;
                var imgfile = $(this).attr("img");
                var imgwidth = 30;
                var defstyle = " style='padding-right:5px;'";
                var divstyle = " style='padding-bottom:4px;'";
                if(!(jQuery.type(tagstr) === "undefined")){
                    if(tagstr.indexOf("NAX") != -1){ divstyle=" style='color:green;padding:1px !important;'";defstyle="";imgfile = "img/mn/"+id+".png";imgwidth=30;}
                    else if(tagstr.indexOf("SMU") != -1){ divstyle=" style='color:#f04115;padding:0.5px !important;'"}
                    else if(tagstr.indexOf("0") != -1){ divstyle = " style='color:red;padding:0.5px !important;'";}
                    else if(tagstr.indexOf("2") != -1){ divstyle=" style='color:purple;padding:0.5px !important;'";}
                    else if(tagstr.indexOf("4") != -1){ divstyle=" style='color:#fb60ae;padding:0.5px !important;'";}
                }
                //var divstyle = (txtcolor != null) ? " style='color:"+txtcolor+";padding:1px !important'" : "";
                var divstr = "<div "+ divstyle +">";


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
    var docht = screenheight ;
    var docwd = $(document).width();
    var calheaderht = 90;
    
    var selectedyearfontsz = "0.9em";
    var selectedmonthfontsz = "1.6em";
    var calweeknamesfontsz = "1.1em";
    var diff = 20;
    
    $("#calweeknames").css("font-size",calweeknamesfontsz);
    $(".div-selected-year").css("font-size",selectedyearfontsz);
    $("#selectedmonth").css("font-size",selectedmonthfontsz)
    caltddim = (docwd/7);
    
}

$( document ).bind("pagebeforechange", function(event,data) {
    var toPage = data.toPage;
    if(typeof toPage == "object" && toPage[ 0 ].id == "splashscreepage" && splashscreendisplayed){
        event.preventDefault();
        $.mobile.changePage("#landingpage", "fade");
    }
});

$( document ).on( "pageinit", "#about-page", function() {
    var docht = screenheight - mainfooterht;
    //alert(docht);
    $(".aboutpagecl").find("td.aboutcls").each(function(){
        var height = (docht/2) - 20;
       $(this).css("height",height); 
        $(this).parent().css("height",height);     
    });
});

var feednotificationdata = [];
var feedmessagedata = [];
var splsrnhide = null;
//var intervalcount = 0;

var pageundosequence = [];
$(document).on("pagebeforehide",".data-role-pagetype",function(){
   pageundosequence.push({"pageid":this.id,"data":null}); 
});

$(document).on("pagebeforeshow",".data-role-pagetype",function(){
   pageundosequence = [];
});

var splashscreendisplayed = false;
$( document ).on( "pageinit", "#splashscreepage", function() {  
    //window.localStorage.clear();
    readstorefeedsdata(feednotificationdata,'notifyfeedsstore');
    readstorefeedsdata(feedmessagedata,'messagefeedsstore');
    
    splsrnhide = setTimeout(hidesplashscreen, 5000);
    var docht = $(document).height();
    var docwd = $(document).width();
    $("#splashscreenimg").height(docht);
    $("#splashscreenimg").width(docwd);
    
});

var mainfooterht = 0;
$( document ).on( "pageinit", "#landingpage", function() {    
    //splsrnhide = setTimeout(hidesplashscreen, 3000);
    landingElementsDimensions();
    loadCalendar();
    
    var feedContainer = $("#news-data");
    populatefeedsandmessages(feedContainer,feednotificationdata);
    
    var messagesContainer = $("#messagescontainer");
    populatefeedsandmessages(messagesContainer,feedmessagedata);
    
    homepageinit = true;
        
    //funcLoadLatestFeedsInterval();    
});

var loadlatestfeedsInterval = null; 
function funcLoadLatestFeedsInterval(){
    //alert("Loading latest feeds");
    loadlatestfeeds();
    if(loadlatestfeedsInterval != null){
        clearInterval(loadlatestfeedsInterval);
    }
    loadlatestfeedsInterval = setInterval(function(){        
        //alert("Interval call")
        loadlatestfeeds();
    }, 5 * 60 * 1000); //5mins
}

function landingElementsDimensions(){
    var docwd = $(document).width();
    var docht = $(document).height();
    
    tdwd = Math.round(docwd/3);
    
    $("#landpgbannertop").find("td").each(function(){
        $(this).css("height",Math.round(docht * 2/100)+"px");
    })
    
    var btim = Math.round((tdwd) * 30/100)
    $(".custom-btn").each(function(){        
        $(this).css("height",btim+"px");
        $(this).css("width",btim+"px");
       
    });
    
}

function readstorefeedsdata(feeddata,feedstorename){
    var notifyfeedstorestr = window.localStorage.getItem(feedstorename);
    if(notifyfeedstorestr != null){
        var objArr = jQuery.parseJSON( notifyfeedstorestr );
        for(var i in objArr){
            feeddata.push(objArr[i]);
        }
        
    }
}

function retrievelinkjsonobject(str){
    var linkdata = {};
    var linkdecoded = $('<div/>').html(str).text();
                
    try { linkdata = JSON.parse(linkdecoded);}catch(err) {
        linkdata.name = str;linkdata.url = str;
    }
    return linkdata;
}


var screenheight = 0;
function hidesplashscreen() {
    
    screenheight = $(document).height();
    $.mobile.changePage("#landingpage", "fade");
    clearTimeout(splsrnhide);
    splashscreendisplayed = true;
}


var tabmonth=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

var totalfeedcount = 15;
var allowhistoryview = false;
function loadhistorynotificationfeeds(){
    var id = (feednotificationdata.length > 0)? +(feednotificationdata[0].id) - 1: 0;
    loadhistoryfeeds(feednotificationdata,"http://srigurudev.org/app/v1/views/older?fromid="+id+"&limit="+totalfeedcount+"&type=1",$("#feedscontainer"));
}

function loadhistorymessagefeeds(){
    var id = (feedmessagedata.length > 0)? +(feedmessagedata[0].id)  - 1 : 0;
    loadhistoryfeeds(feedmessagedata,"http://srigurudev.org/app/v1/views/older?fromid="+id+"&limit="+totalfeedcount+"&type=2",$("#messagescontainer"));
}

function loadhistoryfeeds(feeddata,url,container){
    var id = (feeddata.length > 0)? feeddata[0].id : 0;
    retrievejsondatafromsrv(url,feeddata,function(dataarr){
        allowhistoryview = true;
        for(var i in dataarr){
            feeddata.push(dataarr[i]);
            populatesinglefeedOrMessage($(container),dataarr[i],0);
        }
        sortarr(feednotificationdata);
    });
}

var dataProcessStatus = {"type-1":false,"type-2":false};
function loadlatestfeeds(){
    
    var todayDate = new Date();
    var todaymonth = todayDate.getMonth()+1;
    var todayyear = todayDate.getFullYear();
    var todaydate = todayDate.getDate();
    
    calUIdata2["current-year"] = calUIdata1["current-year"]=2017;
    calUIdata2["current-month"] = calUIdata1["current-month"]=todaymonth;
    calUIdata2["current-date"] = calUIdata1["current-date"]=todaydate;
        
    var id = 0;
    if(dataProcessStatus["type-1"] == false){
        id = (feednotificationdata.length > 0)? +(feednotificationdata[feednotificationdata.length -1].id) + 1: 0;
        loadlatestfeedsProcess(feednotificationdata,"http://srigurudev.org/app/v1/views/latest?fromid="+id+"&limit="+totalfeedcount+"&type=1",$("#news-data"),1);
    }
        
    if(dataProcessStatus["type-2"] == false){
        id = (feedmessagedata.length > 0)? +(feedmessagedata[feedmessagedata.length -1].id) + 1: 0;
        loadlatestfeedsProcess(feedmessagedata,"http://srigurudev.org/app/v1/views/latest?fromid="+id+"&limit="+totalfeedcount+"&type=2",$("#messagescontainer"),2);
    }
}

function loadlatestfeedsProcess(feeddata,url,container,type){
    var id = (feeddata.length > 0)? feeddata[feeddata.length -1].id : 0;
    retrievejsondatafromsrv(url,type,function(dataarr){
        sortarr(dataarr);
        for(var i in dataarr){
            feeddata.push(dataarr[i]);
            if(homepageinit){
                updatefeedui($(container),dataarr[i],feeddata);
            }
            
            var feedstorename = $(container).attr('id') == 'news-data' ? 'notifyfeedsstore' : 'messagefeedsstore';
            var feedstorestr = window.localStorage.getItem(feedstorename);
            var feedstore =[];
            if(feedstorestr != null){
                feedstore = jQuery.parseJSON( feedstorestr);
            }
            feedstore.push(dataarr[i]);
            while(feedstore.length > totalfeedcount){
                feedstore.shift();
            }
            var myJsonString = JSON.stringify(feedstore);
            window.localStorage.setItem(feedstorename, myJsonString);
        }
    });   
}

function updatefeedui(container,data,feeddata){
    populatesinglefeedOrMessage(container,data,1);
}

function retrievejsondatafromsrv(url,type,callbackfunc){
    dataProcessStatus["type-"+type] = true;
    $.ajax({
        type: "GET",
        url : url,
        dataType : 'json',
        success : function(data){
            if(callbackfunc != null){  callbackfunc(data);} 
            dataProcessStatus["type-"+type] = false;
        },
        error : function(XMLHttpRequest,textStatus, errorThrown) {   
            //alert("Something wrong happended on the server. Try again.."); 
            dataProcessStatus["type-"+type] = false;
        }
    });
}

function sortarr(arrdata){
    arrdata.sort(function(a, b){
        var aint = parseInt(a.id);
        var bint = parseInt(b.id);
        if (aint < bint) return -1;
        if (bint < aint) return 1;
        return 0;
    });
}

var homepageinit = false;

function populatefeedsandmessages(container,data){
    for(var i in data){
        populatesinglefeedOrMessage(container,data[i],2);        
    }
}

var feedlastdatedisplay = null;
var feedstypes = {"10":"news","11":"event","20":"msg-sg","21":"msg-t"};
function populatesinglefeedOrMessage(container,data,newfeed){
    var type = feedstypes[data.type];
    
    if(type == "event" || type == "news" || type == "msg-sg" || type == "msg-t"){
            var datatodisplay = "";
            var typeimg = type == "event"?"img/event.png":"img/news.png";
        
            var textdata = data.title != null ? "<div style='font-weight:bold;'>"+data.title+"</div>" : "";
            textdata += data.data != null ? "<div>"+data.data+"</div>" : "";
        
            datatodisplay = textdata;
        
            if(data.link != null && data.link !== ""){
                var linkdata = retrievelinkjsonobject(data.link);
                datatodisplay +=  "<div><a href='#' onclick='window.open(\""+linkdata.url+"\", \"_system\");'>"+linkdata.name+"</a></div>";
            }
            if(type == "msg-sg" || type == "msg-t"){
                datatodisplay += data.img !== undefined && data.img != null && data.img != "" ? "<div width='100%' style='text-align:center;'><img src='"+data.img+"' style='width:70%;height:auto;' onerror=\"this.src='img/no-preview.png'\"/></div>" : "";
            }else{
                dataimage = data.img !== undefined && data.img != null && data.img != "" ? data.img : "img/no-preview.png";
            }
            /*if(data.moredata != null && data.moredata !== ""){
                var linkdata = retrievelinkjsonobject(data.moredata);
                datatodisplay += "<div width='100%' style='text-align:center;'><a href='#' onclick='window.open(\""+linkdata.url+"\", \"_system\");' data-role='button' class='ui-btn text-shadow-none' style='color:black' data-theme='b'>"+linkdata.name+"</a></div>";
            }*/
        
            if(data.moredata != null && data.moredata !== ""){
                var linkdata = retrievelinkjsonobject(data.moredata);
                datatodisplay += "<div><a href='#' onclick='window.open(\""+linkdata.url+"\", \"_system\");'>"+linkdata.name+"</a></div>";
            }
            
        
            var today = new Date();
            var todaymonth = today.getMonth()+1;
            var todayyear = today.getFullYear();
            var todaydisp = todayyear +'-'+ todaymonth +'-'+today.getDate();
        
            //var parts =data.date.split[' '][0].split('-');
            //please put attention to the month (parts[0]), Javascript counts months from 0:
            // January - 0, February - 1, etc
            //var dt = new Date(parts[2],parts[1]-1,parts[0]); 
            var feeddata = data.date.split(' ')[0];
            var dt = new Date(feeddata);
            var displaydate = (todaydisp == feeddata) ?"Today":dt.getDate() + " "+tabmonth[dt.getMonth()] + ", " + (parseInt(dt.getFullYear()) % 2000) ;
            var datedisplayclass = displaydate.replace(" ","_")+"cls";
        
            /*if(feedlastdatedisplay == displaydate){
                var obj = $(container).find("."+datedisplayclass);
                $(obj).remove();                
            }*/
            feedlastdatedisplay = displaydate;
        
            var feedclass = newfeed == 1 ? "newfeedscls" : "feedscls";
            var feedtypecls = $(container).attr('id')+datedisplayclass;
        
            var nolinkdata = "<div>	<table><tr>		<td style='width:60%;vertical-align: top;'><table><tr><td style='width:20%;'><img style='width:100%;height:auto;'src='"+typeimg+"'/></td>			<td style='vertical-align: middle;text-align:left;color:grey;font-style: italic;padding-left:5px;font-weight: normal !important;font-size:0.8em;'>"+displaydate+"</td></tr></table><div style='color:black;font-weight: normal !important;'>"+datatodisplay+"</div></td>		<td style='width:40%;padding:5px;'><img style='width:100%;height:auto;' src='"+dataimage+"'  onerror=\"this.src='img/no-preview.png'\"/></td>		</tr>	</table> 	</div>"
            
            if(type == "msg-sg" || type == "msg-t"){
                var msgfrom = "Sadguru";
                var fontcolor = "red";
                if(type == "msg-t"){
                    msgfrom =  "Tapobhumi";
                    fontcolor =  "blue";
                }
                
                
                typeimg = type == "msg-sg"?"img/about_swamiji_sm.png":"img/about_sampradaya_sm.png";
                $("#landingpgmesgcontainer").show();
                var landingpgmessage = "<div class='latestmessagecls' style='font-style: italic;display: table;margin: 0 auto;'>" + textdata + " <div style='text-align:right;'>- " + msgfrom + "</div></div>"
                $("#messagestodisplay").find(".latestmessagecls").remove();
                $("#messagestodisplay").append(landingpgmessage);
                msgfrom = "<div style='font-style: italic;padding-bottom:5px;color:"+fontcolor+"'>Message from "+msgfrom+":</div>";
                
                nolinkdata = "<div style='padding:1px;'><table width='100%'><tr><td style='vertical-align: middle;text-align:left;color:grey;font-style: italic;padding-left:5px;font-weight: normal !important;font-size:0.8em;'>"+displaydate+"</td><td width='80%' style='vertical-align: top;'>"+msgfrom+"</td></tr><tr><td width='20%' style='padding:5px;vertical-align: top;' ><img src='"+typeimg+"' style='width:80%;height:auto;'/></td><td width='80%' style='padding:5px;vertical-align: top;'>"+datatodisplay+"</td></tr></table></div>";
            }
            
            var linkdatahtml = nolinkdata;
        
            /*if(data.moredata != null && data.moredata !== ""){
                var linkdata = retrievelinkjsonobject(data.moredata);
                linkdatahtml = "<a href='#' onclick='window.open(\""+linkdata.url+"\", \"_system\");' style='text-decoration:none;'>" + nolinkdata + "</a>";
            }*/
        
            var feeddatahtml = "<div style='width:100%;'>	<div style='padding:5px;border: 0.1em solid #eee;'> "+linkdatahtml+"</div>	<div style='height:5px;background: linear-gradient(#eee, #fff);'></div></div>"
        
            $(container).prepend(feeddatahtml);
            
            if($(container).find(".feedscls").length > totalfeedcount && !allowhistoryview){
                var oldlastfeed = $(container).find(".feedscls").last();
                if($(oldlastfeed).prev().hasClass("feeddatecls")){
                    $(oldlastfeed).prev().remove();
                }
                $(oldlastfeed).remove();
            }
        
        }
}

var maincalloaded = false;
$( document ).on( "pageinit", "#maincalender", function() {
    deviceReadyBgchange();
    calculatedimensions();    
    createFinderMenu("#findermenulist");    
    loadData(calerdarxml);
    
    $('#calheader').addClass("month"+ month +"-theme");
    maincalloaded = true;
        
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
    if(maincalloaded){ updatecalendardata();}
    $("#panchanglink").show();
    $("#calendarlink").hide();
}

function showpanchang(){
    calPrevUIdata = calUIdata;
    calUIdata = calUIdata2;
    updateHeaderClass();
    $('#calfinderpanel').hide();
    if(maincalloaded){ updatecalendardata();}
    $("#calendarlink").show();
    $("#panchanglink").hide();
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
    
});

function onclickprevbtn(){
   
  pagedata = pageundosequence.pop();
  if(pagedata.data == null){
    $.mobile.changePage($("#"+pagedata.pageid), {
       reverse: true
   });
  }else if(pagedata.pageid == "finder-page"){
      loadcalendarfilterdata(pagedata.data.filterid,pagedata.data.filtername);
  }
}


function oncalswiperight(){
    if(calUIdata["selected-month"] > 1){
        prevmonth();
    }
    return false;     
}

function oncalswipeleft(){
    var months = $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month");
    if(months.length > calUIdata["selected-month"]){
        nextmonth();
    }    
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
    monthcolorcode[0]="#fb60ae";monthcolorcode[1]="#fb6068";monthcolorcode[2]="#d4493a";monthcolorcode[3]="#90a32a";
    monthcolorcode[4]="#69d416";monthcolorcode[5]="#2aa33e";monthcolorcode[6]="#2aa37b";monthcolorcode[7]="#1f6769";
    monthcolorcode[8]="#4985a3";monthcolorcode[9]="#233881";monthcolorcode[10]="#4b308d";monthcolorcode[11]="#683d8d";
    
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
        
        
        var qoutes = $(calerdarxml).find("calendar[id='"+ year + "'] > quotes");
        var x = Math.floor((Math.random() * qoutes.children().size()) + 1);
        qoutes.children().each(function(){
            if($(this).attr("id") == x){
                $("#quoteoftheday").text($(this).text());
            }
        });
    },
    error: function() {
        alert("An error occurred while processing calendar data file.");
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
        alert("An error occurred while processing panchang data file.");
    }
    }); 
    
}

function loadData(xml){
    var yearObj = $(xml).find("calendar[id='"+ calUIdata["current-year"] + "']");
    var yearName = $(yearObj).attr("dn");
    var monthObj = $(yearObj).find("month[id='"+ calUIdata["current-month"] + "']");
    var monthName = $(monthObj).attr("dn"); 
    //$("#selectedmonth").append('<img src="img/mn/monthname/'+month+'.png" width="auto" height="100%"/>');
    $('#selectedmonth').text(function(i, oldText) {
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
                calUIdata["selected-month-changed"] = true;
                updatecalendardata();
            }
            
        });
    })
    
    findermenuonclick();
                               
}

var previousfilter={"filterid":-1,"filtername":""};
function findermenuonclick(){
    monthshortname = new Array(12);
    monthshortname[0]="Jan";monthshortname[1]="Feb";monthshortname[2]="Mar";monthshortname[3]="Apr";
    monthshortname[4]="May";monthshortname[5]="Jun";monthshortname[6]="Jul";monthshortname[7]="Aug";
    monthshortname[8]="Sep";monthshortname[9]="Oct";monthshortname[10]="Nov";monthshortname[11]="Dec";
    $(".find-menu-item").click(function(){
       $("#finderhdrtxt").text($(this).text());
        filtername = $(this).text();
        var tagid = $(this).attr("id").replace("find","");
        if(previousfilter.filterid != -1 && previousfilter.filterid  != tagid){
            pageundosequence.push({"pageid":"finder-page","data":previousfilter});
        }
        previousfilter = {"filterid":tagid,"filtername":filtername};
        loadcalendarfilterdata(tagid,filtername);
        
    });
}

function loadcalendarfilterdata(tagid,filtername){
    $("#finderhdrtxt").text(filtername);
    $("#findercontent").children().remove();
    $(calerdarxml).find("calendar[id='"+ calUIdata["selected-year"] + "'] > month > date > d*[tag='"+tagid+"']").each(function(){
           divstr = $(this).text();
           var imgfile = $(this).attr("img");
           if(!(jQuery.type(imgfile) === "undefined")){
            divstr = "<table width='100%'><tr><td>"+$(this).text()+"</td><td width='20%'><img src='"+ imgfile +"' width='40px' height='auto'/></td></tr></table>"
           }
           $("#findercontent").append("<div style='padding:5px;' class='finddatacls'><table width='100%'><tr><td width='20%' style='text-align:center'><div width='100%'><div style='background-color:"+monthcolorcode[$(this).parent().parent().attr("id") - 1]+";color:white;padding: 5px;border-top-left-radius: 10px;'>"+monthshortname[$(this).parent().parent().attr("id") - 1] + "</div><div style='background-color:rgba(240,240,240,0.5);padding: 5px;border-bottom-left-radius: 10px;'><img src='img/mn/"+$(this).parent().attr("id")+".png' width='30%' height='auto'/></div></div></td><td width='80%' style='background-color:rgba(240,240,240,0.5);padding: 5px;'>"+divstr+"</td></tr></table></div>")
       });
}

$(document).on("pagebeforeshow","#maincalender",function(){ // When entering mainclander
  $('body').removeClass("body-landingpgbg");
  $('body').removeClass("body-initstyle");
  $('body').removeClass("body-mainpanchangbg");
  $('body').removeClass("body-maincalenderbg");
});

$(document).on("pagebeforehide","#maincalender",function(){ // When leaving mainclander
});

function removeAllBodyBackground(){
  $('body').removeClass("body-landingpgbg");
  $('body').removeClass("body-initstyle");
}


$(document).on("pagebeforeshow","#landingpage",function(){
    removeAllBodyBackground();
});

$(document).on("pagebeforehide","#landingpage",function(){
    removeAllBodyBackground();
     $('body').addClass("body-fixstyle");
    mainfooterht = $("#landingfooter").height();
});

// Call onDeviceReady when Cordova is loaded.
//
// At this point, the document has loaded but cordova.js has not.
// When Cordova is loaded and talking with the native device,
// it will call the event `deviceready`.
//
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    deviceReadyBgchange();
    document.addEventListener("resume", onResume, false);
    funcLoadLatestFeedsInterval();
    var todayDate = new Date();
    var todaymonth = todayDate.getMonth()+1;
    var todayyear = todayDate.getFullYear();
    var todaydate = todayDate.getDate();
    
    calUIdata2["selected-year"] = calUIdata1["selected-year"]=2017;
    calUIdata2["selected-month"] = calUIdata1["selected-month"]=todaymonth;
    calUIdata2["selected-date"] = calUIdata1["selected-date"]=todaydate;
}

// Handle the resume event
//
function onResume() {
    funcLoadLatestFeedsInterval();
}

function deviceReadyBgchange(){
    $('body').removeClass("body-initstyle");
    $('body').addClass("body-fixstyle");
}
