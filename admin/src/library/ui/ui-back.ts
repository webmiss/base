import App from '@/main';

/* UI-返回 */
export default (num: number)=>{
  App.$router.goBack(-num);
}