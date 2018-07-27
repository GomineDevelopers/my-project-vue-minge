const commonTools = {};

commonTools.g_restUrl = 'http://icampaign.com.cn/customers/minge/backend/app/index.php?wxref=mp.weixin.qq.customers#wechat_redirect';

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


export {commonTools}
