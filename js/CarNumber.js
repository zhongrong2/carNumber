var provinces = new Array("京","津","冀","辽","吉","黑","蒙","鲁",
            "豫","沪","浙","苏","粤","晋","川","皖",
            "鄂","贵","云","桂","琼","青","新","藏",
            "渝","宁","甘","陕","闽","赣","湘");

var keyNums = new Array("0","1","2","3","4","5","6","7","8","9",
            "Q","W","E","R","T","Y","U","I","O","P",
            "A","S","D","F","G","H","J","K","L",
            "OK","Z","X","C","V","B","N","M","Del");
var next=0;			
	function showProvince(){
			$("#pro").html("");
			var ss="";
			for(var i=0;i<provinces.length;i++){
				ss=ss+addKeyProvince(i)
			} 
			$("#pro").html("<ul class='clearfix ul_pro'>"+ss+"<li class='li_close' onclick='closePro();'><span>关闭</span></li><li class='li_clean' onclick='cleanPro();'><span>清空</span></li></ul>");
	} 
	function showKeybord(){
			$("#pro").html("");
			var sss="";
			for(var i=0;i<keyNums.length;i++){
				sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
			} 
			$("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
	}
    function addKeyProvince(provinceIds){
        var addHtml = '<li>';
            addHtml += '<span onclick="chooseProvince(this);">'+provinces[provinceIds]+'</span>';
            addHtml += '</li>';
            return addHtml;
    }

    function chooseProvince(obj){
       $(".carText").val($(obj).text());
	   $(".carText").addClass("hasPro");

       $(".ppHas").removeClass("ppHas");
	   next=0;
	   showKeybord();
	}	

	function choosekey(obj,jj){
		if(jj==29){
			var car =  $(".carText").val();
			if (car.length==7){
                layer.closeAll();
			} else{
                layer.open({
                    content: '请输入正确的车牌号',
                    skin: 'msg',
                    time: 1
                });
			}

		}else if(jj==37){
            var oDivHtml = $("#carText").val();

			if(oDivHtml.length==1){
				$(".hasPro").find("span").text("");			
				$(".hasPro").removeClass("hasPro");	
				showProvince();
				next=0;
			}


            $("#carText").val(oDivHtml.substring(0,oDivHtml.length-1));

			next=next-1;
			if(next<1){
				next=0;
			}
			console.log(next);
		}else{
			if(next>5){
				return
			}
			console.log(next);
			for(var i = 0; i<$(".carText").length;i++){

				if(next==0 & jj<10 & !isNaN($(obj).text())){
					layer.open({
						content: '车牌第二位为字母',
						skin: 'msg',
						time: 1
					});
					return
				}
				var carVal=$(".carText").val();
				$(".carText").val(carVal+$(obj).text());
				$(".carText").addClass("ppHas");
				next=next+1;
				if(next>5){
					next=6;
				}
				getpai();
				return
			}
			
		}
		
		
       
	}

	function closePro(){
       layer.closeAll()
	}

	function cleanPro(){
       $(".ul_input").find("span").text("");
       $(".hasPro").removeClass("hasPro");
       $(".ppHas").removeClass("ppHas");
	   next=0;
	}	
	function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
	function getpai(){
		var pai=trimStr($(".carText").val());
		$(".carText").attr("data-pai",pai);
	}
window.onload = function() {

	$("#carText").click(function(){
		 layer.open({
			type: 1
			,content: '<div id="pro"></div>'
			,anim: 'up'
			,shade :false 
			,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
		  });
		 showProvince()
	})

    // 取消电子会员光标
    $("#carText").focus(function(){
        document.activeElement.blur();
    });
}
