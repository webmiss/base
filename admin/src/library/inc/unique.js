/* 去数组重复 */
export default (arr)=>{
  let data = [];
  for(let i=0,l=arr.length; i<l; i++) {
    for(var j=i+1; j<l; j++) if (arr[i] === arr[j]) j = ++i;
    data.push(arr[i]);
  }
  return data;
}