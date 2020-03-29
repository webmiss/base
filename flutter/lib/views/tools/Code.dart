import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

class Code extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => CodeState();
}

class CodeState extends State<Code> {

  @override
  Widget build(BuildContext context) {

    /* 二维码 */
    Widget qrcode = QrImage(
      data: 'https://webmis.vip',
      size: 240,
      embeddedImage: AssetImage('favicon.png'),
      embeddedImageStyle: QrEmbeddedImageStyle(
        size: Size(40, 40),
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text('生成二维码', style: TextStyle(fontSize: 16)),
      ),
      body: new Center(
        child: qrcode,
      ),
    );
  }
}