/* 版本比较 */
bool versionDiff(String v1, String v2){
  if(v1 == v2) return true;
  var arr1 = v1.split('.');
  var arr2 = v2.split('.');
  if(int.parse(arr1[0])>int.parse(arr2[0])) return true;
  else if(int.parse(arr1[1])>int.parse(arr2[1])) return true;
  else if(int.parse(arr1[2])>int.parse(arr2[2])) return true;
  else return false;
}