import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'

/* 本地消息 */
export default (title,content,isRead)=>{
  // 浏览器
  if(Inc.config.msg.browser && window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function(status) {
      new Notification(title, {body:content });
    });
  }
  // 显示消息
  const text = Inc.config.msg.content=='title'?title:content;
  Toast(text);
  /* 是否阅读 */
  isRead = isRead || false;
  if(!isRead) return;
  // 百度语音
  const token = Inc.storage.getItem('token') || '';
  if(!token) return Toast('请先登录!');
  Post('Usermain/baiduAudio',{token:token,text:text},(res)=>{
    const d = res.data;
    if(d.code!=0) return Toast(d.msg);
    // 音频
    const audio = new Audio();
    audio.src = d.url;
    // 播放
    try{
      if(plus.os.name=='iOS'){
        let AVAudioSession = plus.ios.importClass("AVAudioSession"),
        AVAudioSessionObj = AVAudioSession.sharedInstance();
        AVAudioSessionObj.setCategoryerror('AVAudioSessionCategoryPlayback', null);
        AVAudioSessionObj.setActiveerror('YES', null);
        let AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
        let AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
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