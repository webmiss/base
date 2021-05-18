/* 版本比较 */
export default (v1: string, v2: string)=>{
  if(v1==v2) return true;
  const arr1 = v1.split('.');
  const arr2 = v2.split('.');
  if(parseInt(arr1[0])>parseInt(arr2[0])) return true;
  else if(parseInt(arr1[1])>parseInt(arr2[1])) return true;
  else if(parseInt(arr1[2])>parseInt(arr2[2])) return true;
  else return false;
}