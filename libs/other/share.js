var base64Encode = (function(){
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // private method for UTF-8 encoding
    function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
    
        }
        return utftext;
    }
    
    return function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
    };
})();


var Weixin = (function(){
    //服务端获取签名的请求url
    var WXGetSignAPI = '//sapi.beibei.com/index.php/api/h5_tools/wx_get_sign.html';
    //微信1.0接口
    var API_LIST=['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'];
    var _encode= base64Encode;
    
    //配置微信
    function getAuth(cb,debug){
        $.ajax({
            type: 'GET',
            url: WXGetSignAPI,
            data:{
                url: encodeURIComponent(_encode(location.href)),
                type: 1
            },
            dataType: 'jsonp',
            jsonpCallback: 'BeibeiWxGetSignPackage',
            cache: true,
            success: function(res) {
                if(res.success){
                    var data=res.data;
                    wx.config({
                        debug:debug||false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: API_LIST
                    });
                    typeof cb === 'function' && wx.ready(cb);
                }else{
                    console.warn('获取微信签名失败:'+res.message);
                }
            }
        });
    }
    
    function shareConfig(config){
        var formatParams = {
            title: config.title,
            desc: config.desc,
            link: config.url,
            imgUrl: config.image
        };
    
        wx.onMenuShareTimeline(formatParams);
        
        wx.onMenuShareQQ(formatParams);

        wx.onMenuShareQZone(formatParams);
        
        wx.onMenuShareAppMessage(formatParams);
        
        wx.onMenuShareWeibo(formatParams);
    }
    
    return {
        share: function(config){
            getAuth(function(){
                shareConfig(config);
            }); 
        }
    }
})();

Weixin.share({
    title: 'Allen去哪儿？我们都要跟着去。',
    desc: '2016年12月，贝贝网CEO Allen的一周行程表。',
    url: location.href,
    image: 'http://h0.hucdn.com/open/201651/7ec2ebaa29b6b382_69x69.png'
});