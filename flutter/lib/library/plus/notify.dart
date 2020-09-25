import 'package:flutter/material.dart';
import 'package:webmis/env.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/ui/ui-toast.dart';

/* 本地消息 */
class Notify {
  Notify(
    BuildContext context,
    String title,
    String content,
    { bool isRead: false }
  ){

    // 显示消息
    Toast(context,Env.msg['msg_content']=='title'?title:content);
    /* 是否阅读 */
    if(!isRead) return;

  }
}