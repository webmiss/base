import 'dart:async';

/* 倒计时 */
Timer setTimeout(Function fun, int time){
  Duration timeout = Duration(milliseconds: time);
  return Timer(timeout, fun);
}

/* 定时器 */
Timer setInterval(Function fun, int time){
  Duration timeout = Duration(milliseconds: time);
  return Timer.periodic(timeout, fun);
}