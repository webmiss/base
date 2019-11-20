import 'package:flutter/material.dart';

/* 配置信息 */
const Map<String, dynamic> config = {
  'baseUrl': 'https://api.webmis.vip/',
  'apiUrl': 'api/',
  'name': 'WebMIS',
  'copy': 'Copyright © WebMIS.VIP 2019',
  'themeColor': '#6FB737',
  // 更新
  'update': false,
  'upDateColor': {'bg':'','logo':'','loading':'#FFFFFF','loaded':'#666666'},
  'upIosUrl': 'itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8',
  // Toast
  'toast':{
    'info':{'color': Colors.white, 'background': Color.fromRGBO(19,32,48,0.87)},
    'success':{'color': Colors.white, 'background': Color.fromRGBO(36,179,0,0.87)},
    'error':{'color': Colors.white, 'background': Color.fromRGBO(196,30,4,0.87)},
  },
};