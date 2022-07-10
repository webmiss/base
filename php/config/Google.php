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
      'ClientId'=> '737411831813-58m0bt2u960q35j79q8scuhmdtjj22ci.apps.googleusercontent.com',
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
      'liveChatId'=> 'youtube_liveChatId',          //Redis名称
      'refresh_time'=> 50*60,                       //刷新间隔(秒)
    ];
  }

}