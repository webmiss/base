<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Service\Data;
use Model\WebNews as WebNewsM;
use Model\WebNewsHtml;
use Model\WebNewsClass;
use Library\FileEo;
use Library\Upload;
use Util\Util;

class WebNews extends Base {

  private static $ImgDir = 'upload/news/';

  /* 列表 */
	static function List() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    $page = self::JsonName($json, 'page');
    $limit = self::JsonName($json, 'limit');
    $order = self::JsonName($json, 'order');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data) || empty($page) || empty($limit)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 条件
    $param = json_decode($data);
    list($where, $whereData) = self::getWhere($param);
    // 统计
    $m = new WebNewsM();
    $m->Columns('count(*) AS num');
    $m->Where($where, ...$whereData);
    $total = $m->FindFirst();
    // 查询
    $m->Columns('id', 'cid', 'title', 'source', 'author', 'FROM_UNIXTIME(ctime) as ctime', 'FROM_UNIXTIME(utime) as utime', 'state', 'img', 'summary');
    $m->Where($where, ...$whereData);
    $m->Page($page, $limit);
    $m->Order($order?:'id DESC');
    $list = $m->Find();
    self::Print($m->GetSql());
    // 数据
    foreach ($list as $k => $v) {
      $list[$k]['img'] = Data::Img($v['img']);
      $list[$k]['state'] = $v['state']=='1'?true:false;
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>(int)$total['num']]);
  }
  /* 搜索条件 */
  static private function getWhere(object $param): array {
    // 参数
    $cid = isset($param->cid)?trim($param->cid):'';
    $title = isset($param->title)?trim($param->title):'';
    $source = isset($param->source)?trim($param->source):'';
    $author = isset($param->author)?trim($param->author):'';
    // 条件
    $where = 'cid like ? AND title like ? AND source like ? AND author like ?';
    $whereData = ['%'.$cid.'%', '%'.$title.'%', '%'.$source.'%', '%'.$author.'%'];
    return [$where, $whereData];
  }

  /* 添加 */
  static function Add() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 权限
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $base64 = isset($param->img)?trim($param->img):'';
    $cid = isset($param->cid)?trim($param->cid):'';
    $title = isset($param->title)?trim($param->title):'';
    $source = isset($param->source)?trim($param->source):'';
    $author = isset($param->author)?trim($param->author):'';
    $summary = isset($param->summary)?trim($param->summary):'';
    // 验证
    if($base64=='') return self::GetJSON(['code'=>4000, 'msg'=>'请上传封面图!']);
    if($cid=='') return self::GetJSON(['code'=>4000, 'msg'=>'请选择分类!']);
    if(Util::Len($title)<2 || Util::Len($title)>30) return self::GetJSON(['code'=>4000, 'msg'=>'新闻标题2～30字符!']);
    // 封面图
    $path = self::$ImgDir.'img/';
    $img = Upload::Base64(['path'=>$path, 'base64'=>$base64]);
    // 模型
    $model = new WebNewsM();
    $conn = $model->DBConn();
    try {
      $conn->beginTransaction();
      // 信息
      $m1 = new WebNewsM();
      $m1->Values(['cid'=>$cid, 'title'=>$title, 'source'=>$source, 'author'=>$author, 'summary'=>$summary, 'ctime'=>time(), 'utime'=>time(), 'img'=>$path.$img]);
      list($sql, $args) = $m1->InsertSQL();
      $model->Exec($conn, $sql, $args);
      $id = $model->LastInsertId($conn);
      // 内容
      $m2 = new WebNewsHtml();
      $m2->Values(['nid'=>$id]);
      list($sql, $args) = $m2->InsertSQL();
      $model->Exec($conn, $sql, $args);
      // 提交
      $conn->commit();
      $res = ['code'=>0,'msg'=>'成功'];
    } catch (\Exception $e) {
      $conn->rollBack();
      FileEo::RemoveAll($path.$img);
      $res = ['code'=>5000,'msg'=>'添加失败!'];
    }
    return self::GetJSON($res);
  }

  /* 编辑 */
  static function Edit() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $id = self::JsonName($json, 'id');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($id) || empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $base64 = isset($param->img)?trim($param->img):'';
    $cid = isset($param->cid)?trim($param->cid):'';
    $title = isset($param->title)?trim($param->title):'';
    $source = isset($param->source)?trim($param->source):'';
    $author = isset($param->author)?trim($param->author):'';
    $summary = isset($param->summary)?trim($param->summary):'';
    // 验证
    if($base64=='') return self::GetJSON(['code'=>4000, 'msg'=>'请上传封面图!']);
    if($cid=='') return self::GetJSON(['code'=>4000, 'msg'=>'请选择分类!']);
    if(Util::Len($title)<2 || Util::Len($title)>30) return self::GetJSON(['code'=>4000, 'msg'=>'新闻标题2～30字符!']);
    // 封面图
    $img = '';
    if(substr($base64,0,4)!='http'){
      $path = self::$ImgDir.'img/';
      $img = Upload::Base64(['path'=>$path, 'base64'=>$base64]);
      // 清理封面
      $m1 = new WebNewsM();
      $m1->Columns('img');
      $m1->Where('id=?', $id);
      $tmp = $m1->FindFirst();
      FileEo::RemoveAll($tmp['img']);
    }
    // 模型
    $m = new WebNewsM();
    $data = ['cid'=>$cid, 'title'=>$title, 'source'=>$source, 'author'=>$author, 'summary'=>$summary, 'utime'=>time()];
    if($img!='') $data['img'] = $path.$img;
    $m->Set($data);
    $m->Where('id=?', $id);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      if($img!='') FileEo::RemoveAll($path.$img);
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 删除 */
  static function Del() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $ids = implode(',',$param);
    // 封面图
    $m = new WebNewsM();
    $m->Columns('id', 'img');
    $m->Where('id in('.$ids.')');
    $imgList = $m->Find();
    // 模型
    $model = new WebNewsM();
    $conn = $model->DBConn();
    try {
      $conn->beginTransaction();
      // 信息
      $m1 = new WebNewsM();
      $m1->Where('id in('.$ids.')');
      list($sql, $args) = $m1->DeleteSQL();
      $model->Exec($conn, $sql, $args);
      // 内容
      $m2 = new WebNewsHtml();
      $m2->Where('nid in('.$ids.')');
      list($sql, $args) = $m2->DeleteSQL();
      $model->Exec($conn, $sql, $args);
      // 提交
      $conn->commit();
      // 清理图片
      foreach($imgList as $v){
        FileEo::RemoveAll($v['img']);
        FileEo::RemoveAll(self::$ImgDir.$v['id'].'/');
      }
      $res = ['code'=>0,'msg'=>'成功'];
    } catch (\Exception $e) {
      $conn->rollBack();
      $res = ['code'=>5000,'msg'=>'删除失败!'];
    }
    // 返回
    return self::GetJSON($res);
  }

  /* 状态 */
  static function State(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $id = self::JsonName($json, 'id');
    $state = self::JsonName($json, 'state');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($id)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 模型
    $m = new WebNewsM();
    $m->Set(['state'=>$state?'1':'0', 'utime'=>time()]);
    $m->Where('id=?', $id);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 分类-获取 */
  static function GetClass(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 查询
    $m = new WebNewsClass();
    $m->Columns('id', 'name');
    $m->Where('state=?', '1');
    $m->Order('sort DESC');
    $list = $m->Find();
    // 数据
    $data = [];
    foreach ($list as $v) {
      $data[] = ['label'=>$v['name'], 'value'=>$v['id']];
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','data'=>$data]);
  }

  /* 内容-获取 */
  static function GetContent(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $nid = self::JsonName($json, 'id');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 查询
    $m = new WebNewsHtml();
    $m->Columns('content');
    $m->Where('nid=?', $nid);
    $data = $m->FindFirst();
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','content'=>$data['content']]);
  }

  /* 内容-修改 */
  static function Content(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $id = isset($param->id)?trim($param->id):'';
    $content = isset($param->content)?trim($param->content):'';
    // 图片回收
    Upload::HtmlImgClear($content, self::$ImgDir.$id.'/');
    // 模型
    $m = new WebNewsHtml();
    $m->Set(['content'=>$content]);
    $m->Where('nid=?', $id);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 内容-图片 */
  static function UpImg(){
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $base64 = self::JsonName($json, 'base64');
    $id = self::JsonName($json, 'id');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($base64)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 上传
    $path = self::$ImgDir.$id.'/';
    $img = Upload::Base64(['path'=>$path, 'base64'=>$base64]);
    if(empty($img)) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'img'=>Data::Img($path.$img)]);
  }

}