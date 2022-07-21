<?php
namespace Config;

/* Google */
class Google {

  /* 接口 */
  static function Config(): object {
    return (object)[
      'AuthUri'=> 'https://accounts.google.com/o/oauth2/auth',    //授权
      'TokenUri'=> 'https://oauth2.googleapis.com/token',         //获取Token
      'TokenRevokeUri'=> 'https://oauth2.googleapis.com/revoke',  //撤销Token
      'RedirectUris'=> 'https://php.webmis.vip/youtube',          //回调地址
      'youtubeScope'=> 'https://www.googleapis.com/auth/youtube', //YouTube
      'TokenTime'=> 55*60,                                        //刷新间隔(秒)
    ];
  }

  /* YouTube */
  static function YouTube(): array {
    return [
      'douyin'=>[
        [
          'uname'=> 'webmis@google.com',
          'ApiKey'=> 'AIzaSyDfGM6FpnmUt4LH5zGm-nPuDFDEbgckccs',
          'ClientId'=> '737411831813-58m0bt2u960q35j79q8scuhmdtjj22ci.apps.googleusercontent.com',
          'ClientSecret'=> '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',
        ],
        // [
        //   'uname'=> 'test@google.com',
        //   'ApiKey'=> 'AIzaSyDIVBPxhjI1go9HVtzVIt3NbWC4TC0i4tQ',
        //   'ClientId'=> '290157829658-hidt46oodd0bdt8df2o4b43cd1hu3cki.apps.googleusercontent.com',
        //   'ClientSecret'=> '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',
        // ],
      ]
    ];
  }

}