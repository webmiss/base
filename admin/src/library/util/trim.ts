/* Trim */
export const Trim: Function = (str: string, glue: string='\\s')=>{
  const reg = new RegExp('(^'+glue+'*)|('+glue+'*$)', 'gi');
  return str.replace(reg, '');
}

/* LTrim */
export const LTrim: Function = (str: string, glue: string='\\s')=>{
  const reg = new RegExp('(^'+glue+'*)', 'gi');
  return str.replace(reg, '');
}

/* RTrim */
export const RTrim: Function = (str: string, glue: string='\\s')=>{
  const reg = new RegExp('('+glue+'*$)', 'gi');
  return str.replace(reg, '');
}