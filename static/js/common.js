const commonTools = {};

commonTools.g_restUrl = 'http://icampaign.com.cn/customers/minge/ming/app/index.php';

commonTools.formatDate = function (date, showDetail) {
  var isShow = showDetail || false;
  var d = new Date(parseInt(date) * 1000)
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date1 = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  if (isShow)
    return year + "-" + month + "-" + date1 + " " + hour + ":" + minute + ":" + second;
  else
    return year + "-" + month + "-" + date1;
}

commonTools.formatHour = function (date) {
  var d = new Date(parseInt(date) * 1000)
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date1 = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return month + "-" + date1 + " " + hour + ":" + minute;
}

commonTools.setCookie=function(name,value,myDay){
  var oDate=new Date();
  oDate.setDate(oDate.getDate()+myDay);
  document.cookie=name+'='+value+'; expires='+oDate;
}

commonTools.getCookie=function(name){
  //document.cookie获取当前网站的所有cookie
  var arr=document.cookie.split('; ');
  for(var i=0;i<arr.length;i++){
    var arr1=arr[i].split('=');
    if(arr1[0]==name){
      return arr1[1];
    }
  }
  return '';
}

export {
  commonTools
}
