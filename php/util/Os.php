<?php
namespace Util;

/* 设备信息 */
class Os {

  /* OS */
  static function System(string $user_agent): string {
    switch(true) {
      case strpos($user_agent, 'Win64') || strpos($user_agent, 'Windows NT') :
        return 'Windows';
      case strpos($user_agent, 'Linux') :
        return 'Linux';
      case strpos($user_agent, 'Mac OS') :
        return 'MacOS';
      case strpos($user_agent, 'Unix') :
        return 'Unix';
      default :
        return 'Other';
    }
  }

  /* Browser */
  static function Browser(string $user_agent): string {
    switch(true) {
      case strpos($user_agent, 'MSIE') :
        return 'IE';
      case strpos($user_agent, 'Netscape') :
        return 'Netscape';
      case strpos($user_agent, 'Opera') :
        return 'Opera';
      case strpos($user_agent, 'Firefox') :
        return 'Firefox';
      case strpos($user_agent, 'Chrome') :
        return 'Chrome';
      case strpos($user_agent, 'Safari') :
        return 'Safari';
      default :
        return 'Other';
    }
  }

}