import 'dart:async';
import 'package:flutter/material.dart';
import 'package:webmis/config.dart';

import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:webmis/library/Scroll.dart';
import 'package:webmis/library/Storage.dart';
import 'package:webmis/library/Location.dart';
import 'package:webmis/library/Toast.dart';
import 'package:webmis/library/Alert.dart';
import 'package:webmis/library/Picker.dart';
import 'package:webmis/library/Scan.dart';
import 'package:webmis/library/Img.dart';
import 'package:webmis/library/File.dart';

import 'package:webmis/views/Demo.dart';
import 'package:webmis/views/tools/Code.dart';
import 'package:webmis/views/tools/Search.dart';
import 'package:webmis/views/tools/Maps.dart';

class Index extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => IndexState();
}

class IndexState extends State<Index> {

  // 属性
  ScrollController _scrollController = new ScrollController();
  double _indexScroll = 0.0;
  String _city = '城市定位'; 
  Map<String, dynamic> location;
  List<String> _imgUrls = [];
  List<Map> _nav = [];
  List<Widget> _navPage = [];

  /* 初始化 */
  @override
  void initState() {
    super.initState();
    // 监听滑动
    _scrollController.addListener(() {
      double n = _scrollController.position.pixels;
      if(n<10){
        setState(()=>_indexScroll=0);
      }else if(n>200){
        setState(()=>_indexScroll=1);
      }else{
        setState(()=>_indexScroll=n/100/2);
      }
    });
    // 定位
    if(_city=='城市定位') _location();
    // 加载数据
    _loadData();
  }

  /* 销毁 */
  @override
  void dispose() {
    super.dispose();
  }

  /* 下拉刷新 */
  Future<Null> _refresh() async {
    _location();
    await _loadData();
    return ;
  }

  /* 上拉加载 */
  Future<Null> _load() async {
    print('加载');
    return ;
  }

  /* 定位 */
  Future<Null> _location() async {
    getLocation().then((res){
      if(res==null) return;
      setState(()=>_city = res.city);
      setState(()=>location={'city':res.city,'longitude':res.longitude,'latitude':res.latitude});
    });
    return ;
  }

  /* 加载内容 */
  Future<Null> _loadData() async {

    // 本地存储
    Storage.setItem('test', 'Test');
    // Inc.removeItem('test');
    // Inc.clearItem();
    Storage.getItem('test').then((res){
      print(res);
    });

    // 导航菜单
    setState(() {
      _nav = [
        {'ico':'', 'color':'#6FB737', 'text':'测试'},
        {'ico':'', 'color':'#999999', 'text':'菜单'},
        {'ico':'', 'color':'#999999', 'text':'菜单'},
        {'ico':'', 'color':'#999999', 'text':'菜单'},
      ];
      _navPage = [Demo(),Demo(),Demo(),Demo()];
    });

    // 轮播图
    setState((){
      _imgUrls = [
        'https://goss.veer.com/creative/vcg/veer/800water/veer-150270653.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-300200262.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-162551332.jpg',
      ];
    });

    // 异步请求
    // Inc.post('https://api.ynjici.com/xxx/',{'name':'小明','age':'25'}).then((res){
    //   print(res);
    // }).catchError((e){
    //   print(e);
    // });

  }

  /* 布局 */
  @override
  Widget build(BuildContext context) {

    final size =MediaQuery.of(context).size;

    /* 搜索 */
    Widget _search(){
      return Container(
        padding: EdgeInsets.only(top:24, bottom:4, left:15, right: 5),
        color: Color.fromRGBO(111, 183, 55, _indexScroll),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Container(
              constraints: BoxConstraints(maxWidth: 80),
              child: Text(_city, maxLines: 1, overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white),),
            ),
            Container(
              width: size.width-150,
              height: 30,
              alignment: Alignment.center,
              padding: EdgeInsets.symmetric(horizontal: 10),
              decoration: BoxDecoration(
                color: Color.fromARGB(200, 255, 255, 255),
                borderRadius: BorderRadius.all(Radius.circular(60)),
              ),
              child: Row(
                children: <Widget>[
                  Icon(Icons.search, color: Colors.grey),
                  Text('请输入商品名称',style: TextStyle(color: Colors.grey),)
                ],
              ),
            ),
            IconButton(
              icon: Icon(IconData(0xe904, fontFamily: 'icomoon'), size: 28, color: Colors.white,),
              onPressed: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) => Scan()));
              },
            ),
          ],
        ),
      );
    }

    // 轮播图
    Widget _swiper = Container(
      height: 240,
      child:Swiper(
        itemCount: _imgUrls.length,
        autoplay: true,
        itemBuilder: (BuildContext context,int index){
          return Image.network(_imgUrls[index], fit: BoxFit.fill);
        },
        pagination: SwiperPagination(),
      ),
    );

    // 导航菜单
    List<Widget> _menuBox() => List.generate(_nav.length, (index) {
      return Container(
        width: size.width/4,
        alignment: Alignment.center,
        child: GestureDetector(
          child: Container(
            margin: EdgeInsets.all(10.0),
            child: Column(
              children: <Widget>[
                Icon(Icons.next_week, size: 40, color: Inc.getColor(_nav[index]['color'])),
                Text(_nav[index]['text'])
              ],
            ), 
          ),
          onTap: ()=> Navigator.push(context, MaterialPageRoute(builder: (context){return _navPage[index];}))
        ),
      );
    });
    Widget _menus = Container(
      padding: EdgeInsets.symmetric(vertical: 15),
      color: Colors.white,
      child: Wrap(
        children: _menuBox(),
      ),
    );

    // 功能组件
    Widget _toolBox(icon, name, Object ontap) {
      return Container(
        width: size.width/4,
        alignment: Alignment.center,
        child: GestureDetector(
          child: Container(
            margin: EdgeInsets.all(10.0),
            child: Column(
              children: <Widget>[
                Icon(icon, size: 40, color: Inc.getColor(Inc.themeColor)),
                Text(name)
              ],
            ), 
          ),
          onTap: ontap,
        ),
      );
    }

    // 功能插件
    Widget _tools = Container(
      margin: EdgeInsets.only(top: 15),
      padding: EdgeInsets.symmetric(vertical: 15),
      color: Colors.white,
      child: Wrap(
        children: <Widget>[
          _toolBox(Icons.photo,'图片裁切',(){
            Img.getPhoto().then((img){
              if(img==null) return;
              // 裁切图片
              Img.cropImage(img).then((res){
                print(res.path);
              });
            });
          }),
          _toolBox(Icons.camera,'相机',(){
            // 拍照
            Img.getCamera().then((img){
              if(img==null) return;
              print(img);
            });
          }),
          _toolBox(Icons.file_upload,'图片上传',(){
            Img.getPhoto().then((img){
              if(img==null) return;
              // 压缩图片
              Img.compress(img,200,200).then((img1){
                print(img1.path);
                print(img1.lengthSync());
                // 上传
                File.upFile(Inc.apiUrl+'index/upLoad', img1.path, (t,p){
                  print(t);
                  print(p);
                }).then((res){
                  print(res);
                });
                // 转Base64
                Img.imageBase64(img1.path).then((base64){
                  print(base64);
                });
              });
            });
          }),
          _toolBox(Icons.scanner,'扫码',(){
            Navigator.push(context, MaterialPageRoute(builder: (context) => Scan()));
          }),
          _toolBox(Icons.code,'二维码',(){
            Navigator.push(context, MaterialPageRoute(builder: (context) => Code()));
          }),
          _toolBox(Icons.search,'导航搜索',(){
            Navigator.push(context, MaterialPageRoute(builder: (context) => Search()));
          }),
          _toolBox(Icons.map,'地图',(){
            Navigator.push(context, MaterialPageRoute(builder: (context) => Maps()));
          }),
        ],
      ),
    );

    // UI插件
    Widget _ui = Container(
      margin: EdgeInsets.only(top: 15),
      padding: EdgeInsets.symmetric(vertical: 15),
      color: Colors.white,
      child: Wrap(
        children: <Widget>[
          _toolBox(Icons.info,'提示',(){
            toast(context: context, msg: '提示信息');
            // toast(context: context, type: 'success', msg: '成功');
            // toast(context: context, type: 'error', msg: '操作失败');
          }),
          _toolBox(Icons.sim_card_alert,'弹框',(){
            alert(context: context, title: '标题', body: '测试内容');
          }),
          _toolBox(Icons.select_all,'选择器',(){
            const data = [
              {'a':['小明','张三']},
              {'b':['李四']},
            ];
            pickerShow(context: context, data: data);
          }),
        ],
      ),
    );

    /* UI框架 */
    return Scaffold(
      body: Stack(
        children: <Widget>[
          Container(
            color: Inc.getColor('#F2F2F2'),
            padding: EdgeInsets.all(0.0),
            child: Scroll(
              onRefresh: _refresh,
              onLoad: _load,
              child: ListView(
                controller: _scrollController,
                children: <Widget>[
                  _swiper,
                  _menus,
                  _tools,
                  _ui,
                ],
              ),
            ),
          ),
          Positioned(top: 0,left: 0,right: 0,child: _search()),
        ],
      ),
    );

  }
}
