/* 数组去重复 */
export default (arr: Array<Object>)=>{
  let data: Array<Object> = [];
  for(let i=0, l=arr.length; i<l; i++) {
    for(let j=i+1; j<l; j++) if (arr[i] === arr[j]) j = ++i;
    data.push(arr[i]);
  }
  return data;
}