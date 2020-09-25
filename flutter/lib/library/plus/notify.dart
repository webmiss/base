import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/ui/storage.dart';
import 'package:webmis/library/ui/ui-toast.dart';
import 'package:audioplayers/audioplayers.dart';

/* 本地消息 */
class Notify {
  static BuildContext _context;
  Notify(
    BuildContext context,
    String title,
    String content,
    { bool isRead: false }
  ){
    _context = context;
    // 显示消息
    String text = Env.msg['content']=='title'?title:content;
    Toast(context,text);
    /* 是否阅读 */
    if(isRead) readAudio(text);
  }

  /* 阅读 */
  static Future<bool> readAudio(String text) async {
    // 百度语音
    var token = await Storage.getItem('token');
    var d = await post(Env.msg['api'],{'token':token,'text':text});
    if(d['code']!=0){
      Toast(_context,d['msg']);
      return false;
    }
    // 播放
    AudioPlayer audioPlayer = AudioPlayer();
    int res = await audioPlayer.play(d['url']);
    return res==1??false;
  }

}