import App from '@/main';

/* UI-返回 */
export default (num: number=1)=>{
  App.$router.goBack(-num);
}