<?php
namespace Library;

use Service\Base;

/* 导出 */
class Export extends Base {

  /* Excel内容 */
  static function Excel(array $data=[], array $param=[]): string {
    // 参数
    $param = array_merge([
      'borderColor'=>'#E2E4E8',      //边框颜色
      'titleColor'=> '#666',         //标题颜色
      'titleBgColor'=> '#F2F2F2',    //标题背景
    ],$param);
    // 内容
    $html = '<html>';
    $html .= '<style type="text/css">';
    $html .= 'table td{height: 32px; border: '.$param['borderColor'].' 1px solid;}';
    $html .= '.title{background-color: '.$param['titleBgColor'].'; color: '.$param['titleColor'].'; font-weight: bold;}';
    $html .= '</style>';
    $html .= '<table>';
    foreach($data as $k=>$v1){
      $html .= '<tr>';
      foreach($v1 as $v2){
        $html .= $k==0?'<td class="title">'.$v2.'</td>':'<td>'.$v2.'</td>';
      }
      $html .= '</tr>';
    }
    $html .= '</table>';
    $html .= '</html>';
    return $html;
  }

}