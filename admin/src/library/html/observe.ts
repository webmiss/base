/* 监听容器 */
export default (element: any, callback: Function, options: MutationObserverInit = {attributes: true, childList: true, subtree: true})=>{
  let MutationObserver = window.MutationObserver;
  let obs = new MutationObserver((mutationList)=>{
    callback(mutationList);
  });
  obs.observe(element, options);
}