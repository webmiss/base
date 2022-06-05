from util.util import Util

# 请求
class Export:

  # Excel内容
  def Excel(data: list=[], param: dict={}):
    # 参数
    param = Util.ArrayMerge({
      'borderColor':'#E2E4E8',      #边框颜色
      'titleColor': '#666',         #标题颜色
      'titleBgColor': '#F2F2F2',    #标题背景
    }, param)
    # 内容
    html: str = '<html>'
    html += '<style type="text/css">'
    html += 'table td{height: 32px; border: '+param['borderColor']+' 1px solid;}'
    html += '.title{background-color: '+param['titleBgColor']+'; color: '+param['titleColor']+'; font-weight: bold;}'
    html += '</style>'
    html += '<table>'
    for v1 in enumerate(data) :
      html += '<tr>'
      for v2 in v1[1] :
        html += '<td class="title">'+str(v2)+'</td>' if v1[0]==0 else '<td>'+str(v2)+'</td>'
      html += '</tr>'
    html += '</table>'
    html += '</html>'
    return html