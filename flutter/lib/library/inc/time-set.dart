import 'dart:async';

/* 倒计时 */
void setTimeout(Function fun, int time){
  Duration timeout = Duration(milliseconds: time);
  Timer(timeout, fun);
}

/* 定时器 */
void setInterval(Function fun, int time){
  Duration timeout = Duration(milliseconds: time);
  Timer.periodic(timeout, fun);
}