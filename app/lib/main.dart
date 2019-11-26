import 'dart:async';
import 'dart:convert' as convert;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:ota_update/ota_update.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:webmis/config.dart';
import 'package:webmis/App.dart';
import 'package:webmis/library/China.dart';
import 'package:webmis/library/Info.dart';
import 'package:webmis/library/Socket.dart';
import 'package:webmis/library/Notify.dart';

void main() => Inc.init().then((e) => runApp(MyApp()));

class MyApp extends StatelessWidget {

  Widget build(BuildContext context) {

    // SystemChrome.setPreferredOrientations([
    //   // 强制竖屏
    //   DeviceOrientation.portraitUp,
    //   DeviceOrientation.portraitDown
    //   // 强制横屏
    //   // DeviceOrientation.landscapeLeft,
    //   // DeviceOrientation.landscapeRight
    // ]);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // 中文
      localizationsDelegates: [
        // Input长按修复
        ChineseCupertinoLocalizations.delegate,

        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('en','US'),
        const Locale('zh','CH'),
      ],
      // 主题
      theme: ThemeData(
        brightness: Brightness.light,
        accentColor: Inc.getColor(Inc.themeColor),
        primaryColor: Inc.getColor(Inc.themeColor),
        platform: TargetPlatform.iOS,
      ),
      home: SplashScreen(),
      routes: <String, WidgetBuilder>{
        '/home': (BuildContext context) => new Home()
      },
    );
  }
}

/* 启动界面 */
class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();  
}
class _SplashScreenState extends State<SplashScreen> {

  bool _isUpDate = true;
  bool _isUpButton = false;
  double _upProgress = 0.00;
  String _upMsg = '检测更新';
  Map<String, String> _appInfo = {};
  int _msgNum = 0;

  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 强制更新
    if(Inc.update){
      setState(()=>_isUpDate=true);
      _checkUpdate();
    }else{
      setState(()=>_isUpDate=false);
      startTime();
    }
    // 消息
    Notify.init();
    // Socket
    String _token = '1fBB/6k3i8cV83M+ld2RFtCZSDmYP9vggwyPhOLHvTKmNxsm1Dz6c0jhYDzwGML9nMozHpim8bTbygAc5S93tS5Q82n8QkLfZ8ZeL/wDpeRzLi8w';
    Socket.init(_token).then((res){
      _message();
    });
  }

  /* 监听消息 */
  Future _message() async {
    Socket.channel.stream.listen((message) {
      Map data = convert.jsonDecode(message);
      Notify.show(_msgNum++,data['title'],data['content']);
    });
  }

  /* 检测更新 */
  Future _checkUpdate() async {
    // 获取当前版本
    Info.appInfo().then((info){
      Inc.get(Inc.apiUrl+'Index/appUpdate',{'os':info['platform']}).then((res){
        // 是否下载
        if(info['version']==res['version']){
          setState(()=>_isUpDate=false);
          startTime();
        }else{
          setState((){
            _isUpButton = true;
            _upMsg = '当前: '+info['version']+'  最新: '+res['version']+'  大小: '+(res['size']/1024/1024).toStringAsFixed(2)+'MB';
            _appInfo = {'os':info['platform'],'appName':info['appName'],'packageName':info['packageName'],'file':Inc.baseUrl+res['file']};
          });
        }
      });
    });
  }

  /* 跳转首页 */
  Future startTime() async {
    var _duration = Duration(seconds: 3);
    return Timer(_duration, (){
      Navigator.of(context).pushReplacementNamed('/home');
    });
  }

  /* 下载更新 */
  Future _upDataDown() async {
    setState(()=>_isUpButton = false);
    if(_appInfo['os']=='Android'){
      // 自动安装
      OtaUpdate().execute(_appInfo['file']).listen((OtaEvent event) {
        if(event.status==OtaStatus.DOWNLOADING){
          double progress = double.parse(event.value)/100;
          setState(() {
            _upProgress = progress>=0?progress:0.95;
          });
        }else if(event.status==OtaStatus.INSTALLING){
          setState(() => _upMsg='正在安装...');
        }else{
          setState(()=> _upMsg='下载失败！请重启APP重试');
        }
      });
    }else{
      // AppStore
      if(await canLaunch(Inc.upIosUrl)){
        setState(()=> _upMsg='请在应用商店下载');
        await launch(Inc.upIosUrl);
      }else{
        setState(()=> _upMsg='无法打开应用商店！');
      }
    }
  }

  @override
  Widget build(BuildContext context) {

    final size = MediaQuery.of(context).size;
    final _color = Inc.upDateColor['bg']!=''?Inc.getColor(Inc.upDateColor['bg']):Theme.of(context).primaryColor;
    final _logoColor = Inc.upDateColor['logo']!=''?Inc.getColor(Inc.upDateColor['logo']):_color;
    Widget _logo = Icon(IconData(0xe100, fontFamily: 'icomoon'), color: _logoColor, size: 64,);
    Widget _content;
    Widget _button = Container();
    if(_isUpButton) _button = RaisedButton(child: Text('立即更新'),onPressed: ()=>_upDataDown());
    
    /* 检测更新 */
    if(_isUpDate){
      _content = Stack(
        children: <Widget>[
          Container(
            color: _color,
            child: Center(
              child: Container(
                width: 320,
                height: 280,
                child: Column(
                  children: <Widget>[
                    // Logo
                    Container(
                      width: 120,
                      height: 120,
                      padding: EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Inc.getColor('#FFFFFF'),
                        borderRadius: BorderRadius.all(Radius.circular(60)),
                      ),
                      child: Container(
                        child: _logo,
                      ),
                    ),
                    // 进度条
                    Container(
                      width: 300,
                      height: 5,
                      margin: EdgeInsets.symmetric(vertical: 20),
                      child: LinearProgressIndicator(
                        value: _upProgress,
                        backgroundColor: Inc.getColor(Inc.upDateColor['loaded']),
                        valueColor: AlwaysStoppedAnimation<Color>(Inc.getColor(Inc.upDateColor['loading'])),
                      ),
                    ),
                    Text(_upMsg,style: TextStyle(color: Colors.white)),
                    // 按钮
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
            child: Center(child: Text(Inc.copy),),
            left: 0,
            right: 0,
            bottom: 50.0,
          ),
        ]
      );
    }else{
      // 启动画面
      if(size.width<size.height){
        _content = Image.asset('images/screen_portrait.jpg',height: size.height, fit: BoxFit.cover);
      }else{
        _content = Image.asset('images/screen_landscape.jpg',width: size.width, fit: BoxFit.cover);
      }
    }

    return Scaffold(
      body: Center(
        child: _content,
      ),
    );
  }

}


