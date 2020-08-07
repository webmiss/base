/* Html转换 */
export default (html)=>{
  return html.replace(/<img/gi, '<img class="all img"')
    .replace(/<h1/gi, '<h1 class="all h1"')
    .replace(/<h2/gi, '<h2 class="all h2"')
    .replace(/<h3/gi, '<h3 class="all h3"')
    .replace(/<ul/gi, '<ul class="all ul"')
    .replace(/<p/gi, '<p class="all p"');
}