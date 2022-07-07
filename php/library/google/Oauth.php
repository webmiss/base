<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Library\Curl;

/* Google Oauth2 */
class Oauth extends Base {

  /* Code-获取 */
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

  /* Token-获取 */
  static function GetToken($code){
    $url = Google::Url();
    $cfg = Google::YouTube();
    $data = [
      'code'=> $code,
      'client_id'=> $cfg->ClientId,
      'client_secret'=> $cfg->ClientSecret,
      'redirect_uri'=> $cfg->RedirectUris,
      'grant_type'=> 'authorization_code',
    ];
    $param = Curl::UrlEncode($data);
    // $res= json_decode('{"access_token":"ya29.a0AVA9y1vRfBouCBcENUqYFRyHF7xn20gmCom3x58JWwSV1UiaBAbIOqTSdhcrarkwb-XUMSIXZluz1utUVT-b-HH4rF2Pje5Lj5PXm3MMlQRRjFy5tCzyUwU2pYfloClpNerdXun0se1LA82YMyHhZNWJ-QUG","expires_in":3599,"refresh_token":"1\/\/0eItobyv-CpvyCgYIARAAGA4SNwF-L9Irt9PMbC-yCvf_CH_l6dj7UbvNVYT24MfK8Wtg8IxSOjwLH8edLaxS_NQsu9WRXadfGgs","scope":"https:\/\/www.googleapis.com\/auth\/youtube","token_type":"Bearer"}');
    $res = Curl::Request($url->TokenUri, $param, 'POST');
    return $res;
  }

  /* Token-刷新 */
  static function RefreshToken($refresh_token){
    $url = Google::Url();
    $cfg = Google::YouTube();
    $data = [
      'refresh_token'=> $refresh_token,
      'client_id'=> $cfg->ClientId,
      'client_secret'=> $cfg->ClientSecret,
      'grant_type'=> 'refresh_token',
    ];
    $param = Curl::UrlEncode($data);
    $res = Curl::Request($url->TokenUri, $param, 'POST');
    return $res;
  }

  /* Token-撤销 */
  static function RevokeToken($token){
    $url = Google::Url();
    $data = [
      'token'=> $token,
    ];
    $param = Curl::UrlEncode($data);
    $res = Curl::Request($url->TokenRevokeUri, $param, 'POST');
    return $res;
  }

}