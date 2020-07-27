/* Tinymce配置 */
export default ()=>{
  return {
    language:'zh_CN',
    language_url : '/tinymce/zh_CN.js',
    skin_url: '/tinymce/skins/ui/oxide',
    height: 550,
    menubar: true,
    branding: false,
    toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | table image media preview | removeformat | help',
    toolbar_items_size: 'small',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor textcolor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ]
  }
}