import Env from '../../env'

// 格式化字符串
const _utf8_encode = (string)=>{
  string = string.replace(/\r\n/g, "\n");
  let utftext = '';
  for(var n = 0; n < string.length; n++){
    let c = string.charCodeAt(n);
    if(c < 128){
      utftext += String.fromCharCode(c);
    }else if((c > 127) && (c < 2048)){
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    }else{
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
}

/* Base64-加密 */
export default (str)=>{
  let output = '';
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;
  str = _utf8_encode(str);
  while (i < str.length) {
    chr1 = str.charCodeAt(i++);
    chr2 = str.charCodeAt(i++);
    chr3 = str.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if(isNaN(chr2)){
      enc3 = enc4 = 64;
    }else if(isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      Env.keyStr.charAt(enc1) + Env.keyStr.charAt(enc2) +
      Env.keyStr.charAt(enc3) + Env.keyStr.charAt(enc4);
  }
  return output;
}