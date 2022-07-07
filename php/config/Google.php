<?php
namespace Config;

/* Google */
class Google {

  /* 接口 */
  static function Url(): object {
    return (object)[
      'AuthUri'=> 'https://accounts.google.com/o/oauth2/auth',
      'TokenUri'=> 'https://oauth2.googleapis.com/token',
      'TokenRevokeUri'=> 'https://oauth2.googleapis.com/revoke',
    ];
  }

  /* YouTube */
  static function YouTube(): object {
    return (object)[
      'AppName'=> 'WebMIS',
      'ClientId'=> '737411831813-7getan44tfqk4r4ps1cr0fknhsj3riru.apps.googleusercontent.com',
      'ClientSecret'=> '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',
      'RedirectUris'=> 'https://php.webmis.vip/youtube',
      'Scope'=> 'https://www.googleapis.com/auth/youtube',
      'ApiKey'=> 'AIzaSyDfGM6FpnmUt4LH5zGm-nPuDFDEbgckccs',
    ];
  }

  /* YouTube-Client */
  static function YouTubeClient(): object {
    return (object)[
      'access_token'=> 'youtube_access_token',      //Redis名称 
      'refresh_token'=> 'youtube_refresh_token',    //Redis名称
      'refresh_time'=> 50*60,                       //刷新间隔(秒)
    ];
  }

}