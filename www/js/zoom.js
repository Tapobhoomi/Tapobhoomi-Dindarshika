var isCanvasSet = false;
function gotozoom(){
	$(document).on("pageshow",function(event,data){
		  var docLocation = document.location.href;
		  if(docLocation.indexOf("testpage") !== -1 && isCanvasSet == false){
		    var imgCanvas = document.getElementById('mycanvas');
	        var gesturableImg = new ImgTouchCanvas({
	            canvas: imgCanvas,
	            path:  "img/landingpg_main.jpg",
	            desktop: true
	        });
	        isCanvasSet = true;
		  }
		  if(docLocation.indexOf("testpage") == -1 && isCanvasSet == true){
		    var imgCanvas = document.getElementById('mycanvas');
		    var ctx = imgCanvas.getContext("2d");
		    ctx.clearRect(0, 0, imgCanvas.width,imgCanvas.height);
		    ctx.fillStyle="#000000";
		    ctx.fillRect(0,0,imgCanvas.width,imgCanvas.height);		
		    isCanvasSet = false;
		  }
		});

	document.location.href = "#page2";
}