function DateTimer(){
	this.date      = new Date();
	this.obody     = document.body;
 	this.omonth    = document.getElementById("month");
 	this.oyear 	   = document.getElementById("year");
 	this.con  	   = document.getElementById("td-con");
 	this.prevmonth = document.getElementById("prevmonth");
 	this.nextmonth = document.getElementById("nextmonth");
 	this.prevyear  = document.getElementById("prevyear");
 	this.nextyear  = document.getElementById("nextyear");
 	this.init();
}
//  $(document).on("click",".edate",function(){
//         $(this).addClass("now").siblings().removeClass("now");
//         var txt=$(this).text();
//         var dateVal=dateObj.getFullYear()+"-"+toyear(dateObj)+"-"+txt;   
//  });
//  var dateObj = new Date();
// //  prevmonth.onclick=function(){
// //       var ddm=null;
// //       var ddy=null;
// //       if((dateObj.getMonth()-1)==-1){
// //            ddm=11;
// //            ddy=dateObj.getFullYear()-1;
// //       }else{
// //            ddm=dateObj.getMonth()-1;
// //            ddy=dateObj.getFullYear();
// //       };
// //       dateObj.setFullYear(ddy);
// //       dateObj.setMonth(ddm);
// //       omonth.innerHTML=toyear(dateObj)+"月";
// //       oyear.innerHTML=dateObj.getFullYear();
// //       remove();
// //       oneweek=oneyearoneday(dateObj);
// //       alld=alldays(dateObj);
// //       nowd=nowday(dateObj);
// //       init(oneweek,alld,nowd);
// //  };
// // nextmonth.onclick=function(){
// //     var ddm=null;
// //     var ddy=null;
// //     if((dateObj.getMonth()+1)==12){
// //         ddm=0;
// //         ddy=dateObj.getFullYear()+1;
// //     }else{
// //         ddm=dateObj.getMonth()+1;
// //         ddy=dateObj.getFullYear();
// //     };
// //     dateObj.setFullYear(ddy);
// //     dateObj.setMonth(ddm);
// //     omonth.innerHTML=toyear(dateObj)+"月";
// //     oyear.innerHTML=dateObj.getFullYear();
// //     remove();
// //     oneweek=oneyearoneday(dateObj);
// //     alld=alldays(dateObj);
// //     nowd=nowday(dateObj);
// //     init(oneweek,alld,nowd);  
// // };
// //  prevyear.onclick=function(){
// //       var ddy=dateObj.getFullYear()-1;
// //       dateObj.setFullYear(ddy);
// //       oyear.innerHTML=dateObj.getFullYear();
// //       remove();
// //       oneweek=oneyearoneday(dateObj);
// //       alld=alldays(dateObj);
// //       nowd=nowday(dateObj);
// //       init(oneweek,alld,nowd);
// //  };
// //  nextyear.onclick=function(){
// //       var ddy=dateObj.getFullYear()+1;
// //       dateObj.setFullYear(ddy);
// //       oyear.innerHTML=dateObj.getFullYear();
// //       remove();
// //       oneweek=oneyearoneday(dateObj);
// //       alld=alldays(dateObj);
// //       nowd=nowday(dateObj);
// //       init(oneweek,alld,nowd);  
// //  }; 
DateTimer.prototype.init = function(){

	var initDay = this.getInitDay();//周几
	var curDates = this.getDates();//月天数
	var curDate = this.getDate();//月几号
	var innerHTML = '';
	//月份1号周几之前为白板
	for(var i=0; i <= initDay-1; i++){
		if(i === curDay-1){
			innerHTML+='<div class="start"></div>';
		}else{
			innerHTML+='<div></div>';
		}
    };
    //日期
    for(var i=1; i <= curDates; i++){
        if(i == curDate){     
        	innerHTML+='<div class="cur edate">' + i + '</div>';
        }else{
        	innerHTML+='<div class="edate">' + i + '</div>';
        };
    };
    con.innerHTML = innerHTML;
}

//本月一号是周几  0,1,2,3,4,5,6
DateTimer.prototype.getInitDay = function(){
  	var year = this.date.getFullYear();
  	var month = this.date.getMonth();
  	return new Date(year,month,1).getDay();  
}

//当前几号 1,2,3,4...
DateTimer.prototype.getDate = function(){
	return this.date.getDate();
}

//当前月份 1,2,3,4...
DateTimer.prototype.getMonth = function(){
    return this.date.getMonth() + 1;
}

//获取本月长度 28,29,30,31
DateTimer.prototype.getDates = function(){
    return new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate();
}

//是否是闰年
DateTimer.prototype.isLeapYear = function(){
	let year = this.date.getFullYear();
	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}
