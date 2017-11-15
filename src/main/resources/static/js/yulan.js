window.onload = function () {
    var size=0;
    var cloth;
    $("#file0").change(function() {
        size=this.files.length;
        for(var i in this.files){
            var objUrl = getObjectURL(this.files[i]);
            var imgDom=$("<img src='' id='img"+i+"' style='display: display;'/>");
            $("#form0").append(imgDom);
            $("#img"+i).hide();
            if(objUrl) {
                $("#img"+i).attr("src", objUrl);
            }
        }

    });

    function getObjectURL(file) {
        var url = null;
        if(window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if(window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if(window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    var canvas=document.getElementById("cv");
    var context=canvas.getContext("2d");
    $("#btn").click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        var w=canvas.width/size;
        var h=canvas.height;

        for (var i=0;i<size;i++) {
            (function (_i) {
                var img = new Image();
                img.src = $("#img" + _i).attr("src");
                img.onload = function () {
                    context.drawImage(img, 0, 0, img.width, img.height, _i * w, 0, w, h);
                    if ((_i+1)>=size&&!cloth) {
                        cloth = new ClothApp();
                    }
                };
            })(i);
        }

        // var img=new Image();
        // img.src=$("#img0").attr("src");
        // img.onload=function(){
        //     context.drawImage(img, 0,0,canvas.width,h, 0,0,w,h);
        // }
        // if(size==1) return;
        // var img2=new Image();
        // img2.src=$("#img1").attr("src");
        // img2.onload=function(){
        //     context.drawImage(img2, 0,0,canvas.width,h, w,0,w,canvas.height);
        // }
        // if(size==2) return;
        // var img3=new Image();
        // img3.src=$("#img2").attr("src");
        // img3.onload=function(){
        //     context.drawImage(img3,0,0,canvas.width,h, w*2,0,w,canvas.height);
        // }

    });
}


