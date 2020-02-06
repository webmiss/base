<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

use app\library\Inc;
use app\library\baidu\Ai;
use app\library\Centre;

use app\model\RolePatient;
use app\model\LogPatient;
use app\model\RoleStaff;
use app\model\BaseArea;

class UserMainController extends UserBase{

  static private $menus=[];

  /* 数据中心Token */
  function centreTokenAction(){
    $token = Centre::getToken();
    return self::getJSON(['code'=>0,'token'=>$token,'uid'=>self::$token->uid]);
  }

  /* 百度Token */
  function baiduTokenAction(){
    $token = Ai::getToken();
    return self::getJSON(['code'=>0,'token'=>$token]);
  }

	/* 获取菜单 */
	function getMenusAction(){
    // 全部菜单
    $all = SysMenu::find(['','columns'=>'id,fid,title,url,ico','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 查询菜单
    return self::getJSON(['code'=>0,'menus'=>self::getMenu()]);
  }
  // 递归菜单
	static private function getMenu($fid=0){
    $data=[];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
		foreach($M as $val){
			if(isset(self::$perm[$val['id']])){
        $val['menus'] = self::getMenu($val['id']);
				$data[] = $val;
			}
		}
		return $data;
  }

  /* 动作菜单 */
  function getMenusActionAction(){
    $url = trim($this->request->get('url'));
    $mid = SysMenu::findFirst(['url=:url:','bind'=>['url'=>$url],'columns'=>'id']);
    return self::getJSON([
      'code'=>0,
      'menuAction'=>self::actionMenus(self::$perm[$mid->id]),
    ]);
  }
  // 动作菜单
	static private function actionMenus($perm=''){
		$data = [];
    // 全部动作菜单
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,ico,perm']);
    foreach($aMenus as $val){
			// 匹配权限值
			if(intval($perm)&intval($val->perm)){
				$data[] = ['name'=>$val->name,'action'=>$val->action,'ico'=>$val->ico];
			}
    }
    return $data;
  }

  /* 全部动作菜单 */
  function getActionAllAction(){
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,perm']);
    return self::getJSON(['code'=>0,'aMenus'=>$aMenus]);
  }

  /* 新消息 */
  function msgNewAction(){
    $model = Msg::find(['is_new="0" AND uid=:uid:','bind'=>['uid'=>self::$token->uid],'columns'=>'id,title,content','order'=>'id DESC']);
    $num = $model->count();
    $id='';$title='';$content='';
    if(isset($model[0])){
      $id = $model[0]->id;
      $title = $model[0]->title;
      $content = $model[0]->content;
    }
    return self::getJSON(['code'=>0,'num'=>$num,'name'=>self::$token->data->name,'id'=>$id,'title'=>$title,'content'=>$content]);
  }
  function msgNewStateAction(){
    $id = $this->request->get('id');
    $model = Msg::findFirst(['id=:id: AND uid=:uid:','bind'=>['id'=>$id,'uid'=>self::$token->uid]]);
    $model->is_new = '1';
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 今日患者医嘱 */
  function seaDayAction(){
    $key = trim($this->request->get('key'));
    // 查询患者
    $data = RolePatient::find([
      'state="3" AND (uid="'.$key.'" OR name LIKE "%'.$key.'%" OR id_card LIKE "%'.$key.'%" OR  tel LIKE "%'.$key.'%")',
      'columns'=>'uid,name,gender,tel,id_card',
      'order'=>'id DESC'
    ]);
    // 数据
    $list = [];
    foreach ($data as $key => $val) $list[] = [
      'value'=>$val->name.'('.$val->gender.', '.$val->tel.')',
      'uid'=>$val->uid,
    ];
    return self::getJSON(['code'=>0,'list'=>$list]);
  }
  /* 日程 */
  function getDayAction(){
    $uid = $this->request->get('uid','int');
    $day = date('Y-m-d');
    // 患者日程
    $data = RolePatient::findFirst([
      'state="3" AND uid="'.$uid.'"',
      'columns'=>'id,uid,room_id,name,gender,tel,birthday,therapist_id,evaluate,project,day,dev',
      'order'=>'id DESC'
    ]);
    // 是否存在
    if(!$data) return self::getJSON(['code'=>4000,'msg'=>'今日暂无医嘱信息( '.$day.' )']);
    $data = $data->toArray();
    // 用户信息
    $age = $data['birthday']?Inc::getAge($data['birthday']):0;
    $data['info'] = $data['name'].' ('.$data['gender'].', '.$age.'岁, '.$data['tel'].')';

    // 治疗信息
    if(!empty($data['therapist_id'])){
      // 治疗室
      $room_id = json_decode($data['room_id'],true);
      $all = BaseArea::find(['id in('. implode(',',$room_id) .')','columns'=>'id,name,addr']);
      $room = [];
      foreach($all as $val) $room[$val->id] = $val->name.'('.$val->addr.')';
      unset($data['room_id']);
      // 治疗师
      $all = RoleStaff::find(['uid in('. implode(',',json_decode($data['therapist_id'],true)) .')','columns'=>'uid,name']);
      $therapist = [];
      foreach($all as $val) $therapist[$val->uid] = $val->name;
      unset($data['therapist_id']);
      // 治疗医嘱
      $project = !empty($data['project'])?json_decode($data['project'],true):[];
      /* 医嘱 */
      $dayAll = [];
      $all = !empty($data['day'])?json_decode($data['day'],true):[];
      foreach($all as $k1=>$v1){
        foreach($v1 as $k2=>$v2){
          foreach($v2['days'] as $v3){
            if($day==$v3){
              $pro = $project[$k2];
              foreach($pro as $x=>$y){
                $pro[$x]['type'] = '1';
                $pro[$x]['day'] = $day;
                $pro[$x]['time'] = $k1;
                $pro[$x]['therapist'] = $therapist[$k2];
                $pro[$x]['room'] = $room[$v2['room_id']];
                $pro[$x]['is_me'] = in_array(self::$token->data->room_id,$room_id)?true:false;
              }
              $dayAll[$k1] = $pro;
            }
          }
        }
      }
      /* 设备 */
      $all = !empty($data['dev'])?json_decode($data['dev'],true):[];
      foreach($all as $k1=>$v1){
        foreach($v1 as $k2=>$v2){
          foreach($v2 as $v3){
            foreach($v3['days'] as $v4){
              if($day==$v4){
                $dev = $v3['dev'];
                $dev['type'] = '2';
                $dev['day'] = $day;
                $dev['time'] = $k1;
                $dev['therapist'] = $therapist[$k2];
                $dev['room'] = $room[$v3['room_id']];
                $dev['is_me'] = in_array(self::$token->data->room_id,$room_id)?true:false;
                $dayAll[$k1][] = $dev;
              }
            }
          }
        }
      }
      // 排序
      $timeAll = array_keys($dayAll);
      sort($timeAll);
      $data['pro'] = [];
      foreach($timeAll as $val){
        foreach($dayAll[$val] as $v2){
          $v2['therapy'] = isset($v2['therapy'])?$v2['therapy']:'设备';
          $v2['is_pay'] = LogPatient::find('uid="'.$uid.'" AND day="'.$v2['day'].'" AND time="'.$v2['time'].'" AND sid="'.$v2['id'].'"')->count();
          $data['pro'][] = $v2;
        }
      }
      unset($data['day']);
      unset($data['dev']);
      unset($data['project']);
      /* 评定 */
      $all = !empty($data['evaluate'])?json_decode($data['evaluate'],true):[];
      $data['evaluate'] = self::addTherapist($therapist,$all);
    }

    // 结果
    return self::getJSON(['code'=>0,'list'=>$data,'day'=>$day]);
  }
  /* 追加治疗师 */
  private function addTherapist($therapist,$data){
    $tmp = [];
    foreach($data as $k1=>$v1){
      foreach($v1 as $v2){
        $v2['therapist'] = $therapist[$k1];
        $tmp[] = $v2;
      }
    }
    return $tmp;
  }
  /* 添加 */
  function subDayAction(){
    $uid = $this->request->get('uid','int');
    $pid = $this->request->get('pid','int');
    $data = json_decode($this->request->get('data'));
    print_r($data);
    // 数据处理
    $model = new LogPatient();
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    $model->uid = $uid;
    $model->pid = $pid;
    $model->area_id = self::$token->data->area_id;
    $model->room_id = self::$token->data->room_id;
    $model->group_id = self::$token->data->group_id;
    $model->therapist_id = self::$token->uid;
    $model->sid = $data->id;
    $model->ctime = date('YmdHis');
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4021);
  }
  
}