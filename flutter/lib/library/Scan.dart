import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_qr_reader/qrcode_reader_view.dart';

import 'package:webmis/views/Demo.dart';

class Scan extends StatefulWidget {
  Scan({Key key}) : super(key: key);

  @override
  _ScanState createState() => new _ScanState();
}

class _ScanState extends State<Scan> {
  GlobalKey<QrcodeReaderViewState> _key = GlobalKey();
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: QrcodeReaderView(
        key: _key,
        onScan: onScan,
        headerWidget: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0.0,
        ),
      ),
    );
  }

  Future onScan(String data) async {
    // await showCupertinoDialog(
    //   context: context,
    //   builder: (context) {
    //     return CupertinoAlertDialog(
    //       title: Text("扫码结果"),
    //       content: Text(data),
    //       actions: <Widget>[
    //         CupertinoDialogAction(
    //           child: Text("确认"),
    //           onPressed: () => Navigator.pop(context),
    //         )
    //       ],
    //     );
    //   },
    // );
    // _key.currentState.startScan();
    print(data);
    Navigator.pop(context);
    Navigator.push(context, MaterialPageRoute(builder: (context) => Demo()));
  }

  @override
  void dispose() {
    super.dispose();
  }
}