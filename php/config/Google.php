<?php
namespace Config;

/* 阿里云配置 */
class Google {

  /* RAM访问控制 */
  static function YouTubeCfg(): object {
    return (object)[
      'AppName'=> 'WebMIS',
      'ClientId'=> '737411831813-7getan44tfqk4r4ps1cr0fknhsj3riru.apps.googleusercontent.com',
      'ClientSecret'=> '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',
      'ProjectId'=> 'geometric-shine-354612',
      'JavascriptOrigins'=> 'https://demo-php.webmis.vip',
      'RedirectUris'=> 'https://demo-php.webmis.vip/googleCallback',
      'AuthUri'=> 'https://accounts.google.com/o/oauth2/auth',
      'TokenUri'=> 'https://oauth2.googleapis.com/token',
      'auth_provider_x509_cert_url'=> 'https://www.googleapis.com/oauth2/v1/certs',
    ];
  }

}