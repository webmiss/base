<?php
namespace Util;

/* 设备信息 */
class Os {

  /* OS */
  static function System(string $user_agent): string {
    switch(true) {
      case strpos($user_agent, 'win') || strpos($user_agent, 'Win') :
        return 'Windows';
      case strpos($user_agent, 'linux') || strpos($user_agent, 'Linux') :
        return 'Linux';
      case strpos($user_agent, 'Mac') :
        return 'MacOS';
      case strpos($user_agent, 'unix') || strpos($user_agent, 'Unix') ||  strpos($user_agent, 'BSD') ||  strpos($user_agent, 'HPUX') :
        return 'Unix';
      default :
        return 'Other';
    }
  }

  /* Browser */
  static function Browser(string $user_agent): string {
    switch(true) {
      case strpos($user_agent, 'Maxthon') || strpos($user_agent, 'MSIE') :
        return 'IE';
      case strpos($user_agent, 'Chrome') :
        return 'Chrome';
      case strpos($user_agent, 'Firefox') || strpos($user_agent, 'Mozilla') :
        return 'Firefox';
      case strpos($user_agent, 'Opera') :
        return 'Opera';
      case strpos($user_agent, 'Safari') :
        return 'Safari';
      case strpos($user_agent, 'Netscape') :
        return 'Netscape';
      default :
        return 'Other';
    }
  }

}