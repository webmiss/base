import Env from '@/env'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'

/* 本地消息 */
export default (title: string, content: string, isRead: boolean)=>{
  // 浏览器
  if(Env.msg.browser && window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function(status) {
      new Notification(title, {body:content });
    });
  }
  // 显示消息
  const text = Env.msg.content=='title'?title:content;
  Toast(text);
  /* 是否阅读 */
  isRead = isRead || false;
  if(!isRead) return;
  // 百度语音
  const token = Storage.getItem('token') || '';
  if(!token) return Toast('请先登录!');
  Post('Usermain/baiduAudio',{token:token,text:text},(res: any)=>{
    const d = res.data;
    if(d.code!=0) return Toast(d.msg);
    // 音频
    const audio = new Audio();
    audio.src = d.url;
    // 播放
    try{
      // @ts-ignore
      if(plus.os.name=='iOS'){
        // @ts-ignore
        let AVAudioSession = plus.ios.importClass("AVAudioSession"),
        AVAudioSessionObj = AVAudioSession.sharedInstance();
        AVAudioSessionObj.setCategoryerror('AVAudioSessionCategoryPlayback', null);
        AVAudioSessionObj.setActiveerror('YES', null);
        // @ts-ignore
        let AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
        // @ts-ignore
        let AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
        // @ts-ignore
        let AVSpeechSynthesisVoice = plus.ios.import("AVSpeechSynthesisVoice");
        let speech = new AVSpeechSynthesizer();
        let voice = AVSpeechSynthesisVoice.voiceWithLanguage("zh-CN");
        let utterance = AVSpeechUtterance.speechUtteranceWithString(text);
        utterance.setVoice(voice);
        speech.speakUtterance(utterance);
      }else{
        audio.play();
      }
    }catch(e){
      audio.play();
    }
  });
}