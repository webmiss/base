import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:io';

import 'package:webmis/env.dart';
import 'package:webmis/store.dart';
import 'package:provider/provider.dart';

import 'package:webmis/library/ui/request.dart';
import 'package:webmis/library/ui/ui-color.dart';
import 'package:webmis/library/ui/ui-svg.dart';
import 'package:webmis/library/inc/time-set.dart';
import 'package:webmis/library/inc/version-diff.dart';
import 'package:webmis/library/plus/app-info.dart';

import 'package:ota_update/ota_update.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webmis/views/Home.dart';

void main(){
  // 沉浸式状态栏
  if(Platform.isAndroid){
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ));
  }
  // 强制竖屏
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown
  ]).then((_){
    runApp(
      // 状态管理
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (context)=>Store(),),
        ],
        child: MyApp(),
      )
    );
  });
}

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    /* APP设置 */
    return MaterialApp(
      debugShowCheckedModeBanner: Env.dev,
      title: 'WebMIS Flutter',
      home: SplashScreen(),
      theme: ThemeData(
        platform: TargetPlatform.iOS,
        brightness: Brightness.light,
        accentColor: uiColor(Env.color['primary']),
        primaryColor: uiColor(Env.color['primary']),
      ),
      routes: <String, WidgetBuilder>{
        '/home': (BuildContext context) => new Home()
      },
    );
  }
}

/* 启动画面 */
class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();  
}
class _SplashScreenState extends State<SplashScreen> {

  bool _isUpDate = false; //是否更新
  bool _isUpButton = false; //更新按钮
  String _upMsg = '检测更新'; //提示信息
  double _upProgress = 0.00;  //进度
  Map<String,String> _upInfo = {}; //软件包
  
  /* 构造函数 */
  @override
  void initState() {
    super.initState();
    // 启动时间
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
  Future<void> _goHome(){
    return Navigator.of(context).pushReplacementNamed('/home');
  }
  /* 启动时间 */
  Future<void> _startTime() async {
    setTimeout((){
      if(Env.update['start']) _checkUpdate();
      else _goHome();
    },2000);
  }

  /* 检测更新 */
  Future _checkUpdate() async {
    Map info = await appInfo();
    post('index/appUpdate',{'os':info['platform']}).then((res){
      if(res['code']!=0) return false;
      // 版本比较
      if(!versionDiff(info['version'],res['version'])) return _goHome();
      // 更新
      setState((){
        _isUpDate = true;
        _isUpButton = true;
        _upInfo = {
          'platform': res['platform'],
          'version': res['version'],
          'file': res['file'],
          'size': (res['size']/1024/1024).toStringAsFixed(2),
        };
        _upMsg = '新版本: '+_upInfo['version']+'  大小: '+_upInfo['size']+'MB';
      });
    });
  }
  /* 下载更新 */
  Future _upDataDown() async {
    if(_upInfo['platform']=='Android'){
      double _progress;
      String _size;
      // 下载
      setState(()=> _isUpButton=false );
      OtaUpdate().execute(_upInfo['file']).listen((OtaEvent event) {
        if(event.status==OtaStatus.DOWNLOADING){
          _progress = double.parse(event.value)/100;
          _size = (_progress*double.parse(_upInfo['size'])).toStringAsFixed(2);
          setState((){
            _upProgress = _progress;
            _upMsg = '新版本: '+_upInfo['version']+'  大小: '+_size+'/'+_upInfo['size']+'MB';
          });
        }else if(event.status==OtaStatus.INSTALLING){
          setState((){
            _upProgress = 0.99;
            _upMsg = '正在安装...';
            _isUpButton = true;
          });
        }else{
          setState(()=> _upMsg='下载失败！请重启APP重试');
        }
      });
    }else if(_upInfo['platform']=='iOS'){
      if(await canLaunch(Env.upIosUrl)){
        setState(()=> _upMsg='请在应用商店下载');
        return await launch(Env.upIosUrl);
      }else{
        setState(()=> _upMsg='无法打开应用商店！');
      }
    }
  }

  /* 启动画面 */
  Widget _getScreenContent(context){
    final size = MediaQuery.of(context).size;
    // 竖屏、横屏
    if(size.width<size.height){
      return Image.asset('lib/assets/screen/portrait.png',width:size.width,fit:BoxFit.cover);
    }else{
      return Image.asset('lib/assets/screen/landscape.png',height:size.height,fit:BoxFit.cover);
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
                  Text(_upMsg,style: TextStyle(fontSize: 12, color: uiColor(Env.update['msgColor']))),
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
          left: 0,
          right: 0,
          bottom: 32.0,
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
        ),
      ]
    );
  }

}