function DateTimer(option){
    this.url       = option.url;
    this.exist     = {};
    this.date      = option.currentDate||new Date();
    this.obody     = document.body;
    this.omonth    = document.getElementById("month");
    this.oyear     = document.getElementById("year");
    this.con       = document.getElementById("td-con");
    this.prevmonth = document.getElementById("prevmonth");
    this.nextmonth = document.getElementById("nextmonth");
    this.prevyear  = document.getElementById("prevyear");
    this.nextyear  = document.getElementById("nextyear");
    this.handler = option.handler;
    this.init();
    this.initEvent();
}
DateTimer.prototype.init = function(){

    var initDay = this.getInitDay();//本月初一是星期几
    var curDates = this.getDates();//本月有多少天
    var curDate = this.getDate();//今天是多少号
    var innerHTML = '';

    //月份1号周几之前为白板
    for(var i=0; i <= initDay-1; i++){
        if(i === initDay-1){
            innerHTML+='<div class="start"></div>';
        }else{
            innerHTML+='<div></div>';
        }
    };

    var year = this.date.getFullYear();
    var month = getMonthStr(this.date);
    var ym = year+'-'+month;
    this.oyear.innerHTML = year+'年';
    this.omonth.innerHTML = this.date.getMonth()+1+'月';
    //设置有文章的日期为焦点日期
    if(!this.exist[ym]){
        $.ajax({
            url:this.url,
            type:'GET',
            dataType:'JSON',
            data:{
                start_time_at: ym + '-01',
                end_time_at: ym + '-' + (curDates+1),
                filterBy:'created_at'
            },
            success:function(res){
                this.exist[ym] = {};
                for(var i = 0, len = res.data.length; i < len; i++){
                    res.data[i].created_at = res.data[i].created_at.slice(0,10);
                    this.exist[ym][res.data[i].created_at] = true;
                };
                this.con.innerHTML = innerHTML+this.getInnerHTML(ym);
            }.bind(this)

        })
    }else{
        this.con.innerHTML = innerHTML + this.getInnerHTML(ym);
    }
    
   
}
DateTimer.prototype.getInnerHTML = function(ym){
    var curDates = this.getDates();//月天数
    var curDate = this.getDate();//月几号
    var curYear = this.getFullYear();
    var curMonth = this.getMonth();
    var innerHTML = "";
    for(var i=1; i <= curDates; i++){
        var ymd = ym + '-' + (i < 10 ? '0'+i : i);
        if(i == curDate && curMonth==(new Date().getMonth()+1) && curYear == new Date().getFullYear()){  
            if(this.exist[ym][ymd]){
                innerHTML+='<div data-id='+ymd+' class="cur edate dateable">' + i + '</div>';
            }else{
                innerHTML+='<div class="cur edate">' + i + '</div>';
            }  
        }else{
            if(this.exist[ym][ymd]){
                innerHTML+='<div data-id='+ymd+' class="edate dateable">' + i + '</div>';
            }else{
                innerHTML+='<div class="edate">' + i + '</div>';
            }
        };
    };
    return innerHTML;
}
DateTimer.prototype.initEvent = function(){

    this.prevmonth.onclick = function(){
        if((this.date.getMonth()-1)==-1){
            this.updateDate(this.date.getFullYear()-1,11);
        }else{
            this.updateDate(this.date.getFullYear(), this.date.getMonth()-1);
        };
        
    }.bind(this);

    this.nextmonth.onclick = function(){
        if((this.date.getMonth() + 1) == 12){
            this.updateDate(this.date.getFullYear() + 1, 0);
        }else{
            this.updateDate(this.date.getFullYear(),this.date.getMonth() + 1);
        };  
    }.bind(this);

    this.prevyear.onclick=function(){
        this.updateDate(this.date.getFullYear()-1);
    }.bind(this);

    this.nextyear.onclick=function(){
        this.updateDate(this.date.getFullYear()+1);
    }.bind(this);
    $(document).on("click",".dateable",function(e){
        $(this).addClass("now").siblings().removeClass("now");
        var dateVal = $(e.target).data('id');
        this.handler(dateVal);
    }.bind(this));
};
DateTimer.prototype.updateDate = function(year,month){
    this.date.setFullYear(year);
    if(month!==undefined){
        this.date.setMonth(month);
    };
    this.oyear.innerHTML= this.date.getFullYear();
    this.omonth.innerHTML = this.date.getMonth() + 1 + "月";
    this.init();
},
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
DateTimer.prototype.getFullYear = function(){
    return this.date.getFullYear();
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

function moment(dateObj){
    var year = dateObj.getFullYear();
    var month = getMonthStr(dateObj);
    var date = getDateStr(dateObj);
    return year+'-'+month+'-'+date;
}
function getMonthStr(dateObj){
    var month = dateObj.getMonth()+1;
    return month < 10 ? '0' + month : month;
}
function getDateStr(dateObj){
    var date = dateObj.getDate();
    return date < 10 ? '0'+date : date;
}
