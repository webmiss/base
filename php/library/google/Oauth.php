<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Google\Client;
use Google\Service\YouTube as YouTubeService;
use Library\Redis;

/* Google Oauth2 */
class Oauth extends Base {

  /* 获取Code */
  static function getCode(string $client_id, string $scope, string $redirect_uri, $state='webmis'){
    $cfg = Google::Url();
    $url = $cfg->AuthUri.'?';
    $url .= 'scope='.$scope.'&';
    $url .= 'client_id='.$client_id.'&';
    $url .= 'redirect_uri='.$redirect_uri.'&';
    $url .= 'access_type=offline&';
    $url .= 'include_granted_scopes=true&';
    $url .= 'response_type=code&';
    $url .= 'state='.$state;
    return $url;
  }

}