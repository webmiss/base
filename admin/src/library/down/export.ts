import Blob from "./blob"

/*
* 导出
* data: [['ID','名称'],[1,测试]]
* param: {}
*/
export default (data: any=[], param: any={})=>{
  // 参数
  param = Object.assign({
    filename:'export.xlsx',     //文件名
    borderColor:'#E2E4E8',      //边框颜色
    titleColor: '#666',         //标题颜色
    titleBgColor: '#F2F2F2',    //标题背景
  }, param);
  // 内容
  let html: string = '<html>';
  html += '<style type="text/css">';
  html += `table td{height: 32px; border: ${param.borderColor} 1px solid;}`;
  html += `.title{background-color: ${param.titleBgColor}; color: ${param.titleColor}; font-weight: bold;}`;
  html += '</style>';
  html += '<table>';
  for(let x in data){
    html += '<tr>';
    for(let y in data[x]){
      html += x=='0'?`<td class="title">${data[x][y]}</td>`:`<td>${data[x][y]}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  html += '</html>';
  // 下载
  Blob(html, param.filename);
}