<?php

namespace app\modules\admin\controller;

use app\model\User;
use app\model\UserInfo;
use app\model\UserPerm;
use app\model\UserRole;
use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

class SysUserController extends UserBase {

  static private $menus=[];

  /* 列表 */
  function listAction(){
    // 条件
    $res = self::getSeaWhere()['data'];
    $where = '(a.uname LIKE "%'.$res['uname'].'%" OR a.tel LIKE "%'.$res['uname'].'%" OR a.email LIKE "%'.$res['uname'].'%")';
    if(isset($res['name'])) $where .= ' AND b.name LIKE "%'.$res['name'].'%"';
    if(isset($res['position'])) $where .= ' AND b.position LIKE "%'.$res['position'].'%"';
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 查询数据
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->leftJoin('app\model\UserPerm', 'a.id=c.uid', 'c');
    $builder->where($where);
    $builder->columns('
      a.id,a.uname,a.email,a.tel,a.state,a.state_admin,a.state_app,a.rtime,a.ltime,a.utime,
      b.nickname,b.position,b.name,b.gender,b.birthday,b.img,
      c.perm,c.role
    ');
    $builder->orderBy('a.id DESC');
    // 统计
    $total = $builder->getQuery()->execute()->count();
    // 数据
    $builder->limit($limit,$start);
    $data = $builder->getQuery()->execute()->toArray();
    // 状态
    foreach ($data as $key => $val) {
      $data[$key]['state'] = $val['state']?true:false;
      $data[$key]['state_admin'] = $val['state_admin']?true:false;
      $data[$key]['state_app'] = $val['state_app']?true:false;
    }
    return self::getJSON(['code'=>0,'list'=>$data,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 必须帐号
    $data = json_decode($data);
    if(empty($data->uname) && empty($data->tel) && empty($data->email)) return self::getJSON(['code'=>4000]);
    // 是否存在
    $where = self::getMapWhere(['uname'=>trim($data->uname),'tel'=>trim($data->tel),'email'=>trim($data->email)]);
    $res = User::findFirst($where);
    if(!$res){
      $model = new User();
      $model->rtime = date('YmdHis');
    }else{
      $model = $res;
      $model->utime = date('YmdHis');
    }
    // 数据处理
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    // 默认密码
    $model->password = $data->passwd?md5($data->passwd):'';
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 编辑 */
  function editAction(){
    $id = $this->request->get('id','int');
    $data = $this->request->get('data');
    if(empty($id) || empty($data)) return self::getJSON(['code'=>4000]);
    $data = json_decode($data);
    // 禁止非管理员
    if($id==1 && self::$token->uid!=1) return self::getJSON(['code'=>1,'msg'=>'无权修改管理员信息']);
    // 是否存在
    $where = self::getMapWhere(['uname'=>trim($data->uname),'tel'=>trim($data->tel),'email'=>trim($data->email)]);
    $res = User::findFirst(['id<>:id: AND ('.$where.')','bind'=>['id'=>$id]]);
    if($res) return self::error(4020);
    // 数据处理
    $model = User::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    if(!$model) return self::getJSON(['code'=>4020]);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    $model->utime = date('YmdHis');
    // 是否修改密码
    if(isset($data->passwd) && !empty(trim($data->passwd))) $model->password=md5($data->passwd);
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data','string');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = trim($data,',');
    // 禁止删除管理员
    $arr = explode(',',$id);
    if(in_array(1,$arr)) return self::getJSON(['code'=>1,'msg'=>'禁止删除管理员']);
    // 执行
    $user = User::find(['id in('.$id.')']);
    $info = UserInfo::find(['uid in('.$id.')']);
    $perm = UserPerm::find(['uid in('.$id.')']);
    return $user->delete()&&$info->delete()&&$perm->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 更改状态 */
  function stateAction(){
    // 参数
    $id = $this->request->get('id','int');
    $type = $this->request->get('type','string');
    $state = $this->request->get('state','int');
    // 禁止非管理员
    if($id==1 && self::$token->uid!=1) return self::getJSON(['code'=>1,'msg'=>'无权修改管理员状态']);
    if(($type=='all' || $type=='admin') && $id==1 && self::$token->uid==1) return self::getJSON(['code'=>1,'msg'=>'你确定不想登录了？']);
    // 数据
    $model = User::findFirst(['id=:id:','bind'=>['id' => $id]]);
    if($type=='all'){
      $model->state = $state;
    }else if($type=='admin'){
      $model->state_admin = $state;
    }else if($type=='app'){
      $model->state_app = $state;
    }
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
    $id = $this->request->get('id','int');
    $perm = trim($this->request->get('perm','string'));
    $role = $this->request->get('role','int');
    if(empty($id)) return self::error(4000);
    // 数据处理
    $model = UserPerm::findFirst(['uid=:id:','bind'=>['id'=>$id]]);
    if(!$model){
      $model = new UserPerm();
      $model->uid = $id;
    }
    $model->perm = $perm;
    $model->role = $role;
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }
  
}