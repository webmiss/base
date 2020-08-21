import 'package:flutter/material.dart';

import 'package:webmis/env.dart';
import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-svg.dart';
import 'package:webmis/library/inc/time-set.dart';
import 'package:webmis/library/plus/app-info.dart';

import 'package:webmis/views/index.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: Env.dev,
      title: 'Flutter Demo',
      home: SplashScreen(),
      routes: <String, WidgetBuilder>{
        '/home': (BuildContext context) => new Home()
      },
    );
  }
}
class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();  
}
class _SplashScreenState extends State<SplashScreen> {

  bool _isUpDate = false; //是否更新
  bool _isUpButton = false; //更新按钮
  String _upMsg = '检测更新'; //提示信息
  double _upProgress = 0.10;  //进度
  
  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 启动画面
    _startTime();
  }

  /* Widget */
  @override
  Widget build(BuildContext context) {
    /* 内容 */
    Widget _content;
    if(_isUpDate) _content=_getUpdateContent(context);
    else _content=_getScreenContent(context);
    /* 显示 */
    return Scaffold(
      body: Center(
        child: _content,
      ),
    );
  }

  /* 跳转首页 */
  Future<void> _startTime() async {
    setTimeout((){
      if(Env.update['start']) _checkUpdate();
      else Navigator.of(context).pushReplacementNamed('/home');
    },3000);
  }

  /* 检测更新 */
  Future _checkUpdate() async {
    Map info = await appInfo();
    print(info);
    // Get
    get('index/index',{}).then((res){
      print(res);
    });

    setState((){
      _isUpDate = true;
      _isUpButton = true;
    });
  }
  /* 下载更新 */
  Future _upDataDown() async {
    Map info = await appInfo();
    print(info);
    print(info['appName']);
    // print('下载更新');
  }

  /* 启动画面 */
  Widget _getScreenContent(context){
    final size = MediaQuery.of(context).size;
    // 竖屏、横屏
    if(size.width<size.height){
      return Image.asset('lib/assets/screen/portrait.png',height:size.height,fit:BoxFit.cover);
    }else{
      return Image.asset('lib/assets/screen/landscape.png',width:size.width,fit:BoxFit.cover);
    }
  }

  /* 软件更新 */
  Widget _getUpdateContent(context){
    // Logo
    Widget _logo = Container(
      padding: EdgeInsets.all(4),
      child: uiSvg(src:'lib/assets/logo.svg'),
    );
    // 按钮
    Widget _button = Container();
    if(_isUpButton) _button = RaisedButton(
      color: uiColor(Env.update['butBg']),
      child: Text(
        Env.update['butText'],
        style: TextStyle(color: uiColor(Env.update['butColor'])),
      ),
      onPressed: ()=>_upDataDown()
    );
    // 内容
    return Stack(
      children: <Widget>[
        Container(
          color: uiColor(Env.update['bg']),
          child: Center(
            child: Container(
              width: 220,
              height: 280,
              child: Column(
                children: <Widget>[
                  // Logo
                  Container(
                    width: 120,
                    height: 120,
                    padding: EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: uiColor('#FFFFFF'),
                      borderRadius: BorderRadius.all(Radius.circular(60)),
                    ),
                    child: _logo,
                  ),
                  // 进度条
                  Container(
                    height: 5,
                    margin: EdgeInsets.symmetric(vertical: 20),
                    child: LinearProgressIndicator(
                      value: _upProgress,
                      backgroundColor: uiColor(Env.update['loaded']),
                      valueColor: AlwaysStoppedAnimation<Color>(uiColor(Env.update['loading'])),
                    ),
                  ),
                  Text(_upMsg,style: TextStyle(color: uiColor(Env.update['msgColor']))),
                  Container(
                    padding: EdgeInsets.symmetric(vertical: 20),
                    child: _button,
                  ),
                ],
              ),
            ),
          ),
        ),
        Positioned(
          child: Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.all(8),
                child: Text(
                  Env.title,
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold,color: uiColor(Env.update['copy']))
                ),
              ),
              Center(
                child: Text(
                  Env.copy,
                  style: TextStyle(fontSize: 12,color: uiColor(Env.update['copy']))
              ),
              ),
            ],
          ),
          left: 0,
          right: 0,
          bottom: 32.0,
        ),
      ]
    );
  }

}



