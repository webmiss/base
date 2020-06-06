<?php

namespace app\modules\admin\controller;

use app\library\Inc;
use app\library\Safety;
use app\library\Centre;

use app\model\UserPerm;
use app\model\UserRole;

use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

class SysPermController extends UserBase {

  static private $menus=[];

  /* 列表 */
  function listAction(){
    // 条件
    $data = self::getSeaWhere()['data'];
    $where = '';
    if(isset($data['uname']) && !empty($data['uname'])){
      $res = Centre::getID($data['uname']);
      $where = $res->code==0?'uid='.$res->uid:'0';
    }
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 数据
    $total = UserPerm::count([$where]);
    $list = UserPerm::find([
      $where,
      'columns'=>'*',
      'order'=>'uid DESC',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ])->toArray();
    // 结果
    foreach($list as $key=>$val){
      $res = Centre::uinfo($val['uid']);
      $uinfo = $res->code==0?(Array)$res->info:[];
      $list[$key] = array_merge($val,$uinfo);
      // 重置
      $list[$key]['age'] = $uinfo['birthday']?Inc::getAge($uinfo['birthday']):'';
      $list[$key]['state_admin'] = $val['state_admin']?true:false;
      $list[$key]['state_app'] = $val['state_app']?true:false;
    }
    return self::getJSON(['code'=>0,'list'=>$list,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $data = $this->request->get('data');
    if(!$data || empty($data)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 验证
    $res = Safety::isRight('tel',$data->tel);
    if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    $res = Safety::isRight('passwd',$data->passwd);
    if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    // 是否存在
    $res = Centre::getID($data->tel);
    if($res->code!=0) return self::getJSON(['code'=>4000,'msg'=>$res->msg]);
    // 是否注册
    if($res->uid){
      $model = UserPerm::findFirst(['uid=:uid:','bind'=>['uid'=>$res->uid]]);
      if($model) return self::getJSON(['code'=>0,'msg'=>'已存在该系统!']);
      $uid = $res->uid;
    }else{
      // 注册
      $res = Centre::register($data->tel,$data->passwd);
      if($res->code!=0) return self::getJSON(['code'=>4001,'msg'=>$res->msg]);
      $uid = $res->uid;
    }
    // 配置权限
    $model = new UserPerm();
    $model->uid = $uid;
    $model->state_app = '1';
    $model->role = '1';
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 编辑 */
  function editAction(){
    $data = $this->request->get('data');
    if(!$data || empty($data)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 验证
    $res = Safety::isRight('tel',$data->tel);
    if($res!==true) return self::getJSON(['code'=>4000,'msg'=>$res]);
    // 是否存在
    $model = UserPerm::findFirst(['uid=:uid:','bind'=>['uid'=>$data->uid]]);
    if(!$model) return self::getJSON(['code'=>0,'msg'=>'用户不存在!']);
    // 是否管理员
    if(self::isAdmin($model->uid)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 修改账户、密码
    $res = Centre::changeUname($data->uid,$data->tel,$data->passwd);
    // 结果
    return $res->code==0?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data','string');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = trim($data,',');
    // 执行
    $model = UserPerm::find(['uid in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 状态 */
  function stateAction($type){
    $uid = $this->request->get('uid','int');
    $state = $this->request->get('state','int');
    if(empty($uid)) return self::getJSON(['code'=>4000]);
    // 数据
    $model = UserPerm::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) return self::getJSON(['code'=>4001,'msg'=>'无效用户!']);
    if($type=='admin') $model->state_admin = $state;
    elseif($type=='app') $model->state_app = $state;
    // 是否管理员
    if(self::isAdmin($model->uid)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 结果
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 获取分类 */
  function getClassAction($type=''){
    if($type=='userRole'){
      $data = UserRole::find(['','columns'=>'id,role']);
    }
    return self::getJSON(['code'=>0,'list'=>$data]);
  }

  /* 获取全部菜单 */
  function allMenusAction(){
    // 全部菜单
    $all = SysMenu::find(['','columns'=>'id,fid,title,perm','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 获取菜单
    $menus = self::getMenu();
    // 动作菜单
    $aMenus = SysMenuAction::find(['columns'=>'name,perm']);
    // 组合结果
    $data = []; $n1=0; $allID=[];
    foreach($menus as $v1){
      $data[$n1] = ['id'=>$v1['id'].','.$v1['id'].':0','label'=>$v1['title']];
      $n2=0;
      foreach($v1['menus'] as $v2){
        $data[$n1]['children'][$n2] = ['id'=>$v1['id'].','.$v2['id'].':0','label'=>$v2['title']];
        if(empty($v2['menus'])){
          $n4=0;
          foreach($aMenus as $v4){
            if(intval($v2['perm'])&intval($v4['perm'])){
              $data[$n1]['children'][$n2]['children'][$n4] = ['id'=>$v1['id'].','.$v2['id'].':'.$v4['perm'],'label'=>$v4['name']];
              $allID[$v2['id'].':'.$v4['perm']] = $v1['id'].','.$v2['id'].':'.$v4['perm'];
              $n4++;
            }
          }
        }else{
          $n3=0;
          foreach($v2['menus'] as $v3){
            $data[$n1]['children'][$n2]['children'][$n3] = ['id'=>$v1['id'].'-'.$v2['id'].','.$v3['id'].':0','label'=>$v3['title']];
            $n4=0;
            foreach($aMenus as $v4){
              if(intval($v3['perm'])&intval($v4['perm'])){
                $data[$n1]['children'][$n2]['children'][$n3]['children'][$n4] = ['id'=>$v1['id'].'-'.$v2['id'].','.$v3['id'].':'.$v4['perm'],'label'=>$v4['name']];
                $allID[$v3['id'].':'.$v4['perm']] = $v1['id'].'-'.$v2['id'].','.$v3['id'].':'.$v4['perm'];
                $n4++;
              }
            }
            $n3++;
          }
        }
        $n2++;
      }
      $n1++;
    }
    return self::getJSON(['code'=>0,'menus'=>$data,'id'=>$allID]);
  }
  // 递归菜单
  static private function getMenu($fid=0){
    $data=[];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      $val['menus'] = self::getMenu($val['id']);
      $data[] = $val;
    }
    return $data;
  }

  /* 编辑权限 */
  function permAction(){
    $uid = $this->request->get('uid','int');
    $perm = trim($this->request->get('perm','string'));
    $role = $this->request->get('role','int');
    if(empty($uid)) return self::error(4000);
    // 是否存在
    $model = UserPerm::findFirst(['uid=:uid:','bind'=>['uid'=>$uid]]);
    if(!$model) return self::getJSON(['code'=>4001,'msg'=>'无效用户!']);
    // 是否管理员
    if(self::isAdmin($model->uid)) return self::getJSON(['code'=>4001,'msg'=>'无权修改!']);
    // 数据
    $model->perm = $perm;
    $model->role = $role;
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 是否管理员 */
  private function isAdmin($uid){
    return $uid=='1'&&self::$token->uid!='1'?true:false;
  }

}