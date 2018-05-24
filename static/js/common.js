const g_restUrl = 'http://192.168.0.5/leather/gomineWechat/app/index.php';


function formatDate(date, showDetail) {
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

function formatHour(date) {
  var d = new Date(parseInt(date) * 1000)
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date1 = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return month + "-" + date1 +" " + hour + ":" + minute ;
}


export {formatDate, g_restUrl, formatHour}
