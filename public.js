/**
 * 公共函数
 */

/**
 *校验手机号
 * @param tel
 * @returns {boolean}
 * @constructor
 */
function isMobile(tel) {
    var reg = new RegExp(/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/);

    return tel.match(reg);
}

/**
 * 校验邮箱
 * @param email
 * @constructor
 */
function isEmail(email) {
    //var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

    return email.match(reg);
}
/**
 * 校验中文
 * @param lang
 * @constructor
 */
function isChinese(lang) {
    var reg = /[^\u0000-\u00FF]/;

    return lang.match(reg);
}
/**
 * 校验身份证
 * @param idCard
 * @constructor
 */
function isIDCard(idCard) {
    var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

    return idCard.match(reg);
}
/**
 * 时间戳转字符串
 * @param str
 * @param time
 * @returns {string|*}
 * @constructor
 */
function dateFormat(time, str) {
    str = str ? str.toLowerCase() : 'y-m-d h:i:s'
    var weeks = ['日', '一', '二', '三', '四', '五', '六'];
    var t = new Date(time);
    var year = t.getFullYear();
    var month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
    var day = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
    var hour = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
    var minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
    var second = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
    var week = weeks[t.getDay()];

    str = str.replace('y', year)
        .replace('m', month)
        .replace('d', day)
        .replace('h', hour)
        .replace('i', minute)
        .replace('s', second)
        .replace('w', week);

    return str;
}
/**
 * 字符串转时间戳
 * @param time
 * @returns {number}
 */
function strToTime(time) {
    if (typeof time == 'string') {
        time = time.replace(/\-/g,',').replace(/ /g,',').replace(/:/g,',').split(',')
        for (var key in time) {
            time[key] = parseInt(time[key])
        }
        return new Date(time[0],time[1]-1,time[2],time[3],time[4],time[5]).getTime()
    } else if (typeof time == 'object'){
        return time.getTime()
    }
    return time;

}

function generateMixed(n) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ02345789';
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*(chars.length-1));
        res += chars.charAt(id);
    }
    return res;
}

function inArray(value, arr, accurate) {
    accurate = accurate || false //是否严格匹配，默认否
    if (accurate !== false) {
        for (var key in arr) {
            if (arr[key] === value) {
                return true;
            }
        }
    } else {
        for (var key in arr) {
            if (arr[key].indexOf(value) !== -1 || arr[key] == value) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 数字格式化加逗号
 * @param num
 * @returns {string}
 */
function toThousands(num) {
    num = (num || 0).toString();
    var result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,'') //去除HTML tag
        .replace(/[ | ]*\n/g,'\n') //去除行尾空白
        .replace(/\n[\s| | ]*\r/g,'\n') //去除多余空行
        .replace(/ /ig,'');
    return str;
}

function getRequestParam(url) {
    if (url.indexOf("?") === -1) return null;
    var urlString = url.substring(url.indexOf("?") + 1);
    var urlArray = urlString.split("&");

    var urlObject = []
    for (var i = 0, len = urlArray.length; i < len; i++) {
        var urlItem = urlArray[i];
        var item = urlItem.split("=");
        urlObject[item[0]] = item[1];
    }
    return urlObject;
}

function generateObj(arr) {
    var obj = {}
    for (var key in arr) {
        obj[key] = arr[key]
    }
    return obj;
}

function strLimit(content,limit) {
    limit = limit || 50
    if (content.length <= limit)
        return content;
    return content.substring(0,limit) + '...'
}

function doExchange(doubleArrays) {
    var len = doubleArrays.length;

    if (len >= 2) {
      var len1 = doubleArrays[0].length;
      var len2 = doubleArrays[1].length;
      var newLen = len1 * len2;
      var temp = new Array(newLen);
      var index = 0;

      for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
          temp[index] = doubleArrays[0][i] + '|' + doubleArrays[1][j];
          index++;
        }
      }

      var newArray = new Array(len - 1);
      for (var i = 2; i < len; i++) {
        newArray[i - 1] = doubleArrays[i];
      }
      newArray[0] = temp;
      return doExchange(newArray);

    } else {
      return doubleArrays[0];
    }

}

function generateOrderNum() {
  var time = new Date().getTime();
  var rand = Math.round(Math.random() * 1000000000000000);
  return time + '' + rand;
}

function crypt(str) {
	var code = 123456789;//密钥
    var text = "";
    for(var i=0;i<str.length;i++)//遍历字符数组
    {
    	text += String.fromCharCode(str.charCodeAt(i) ^ code)
    }
    return text;
}