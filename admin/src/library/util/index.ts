/* String to List */
export const Explode: Function = (delimiter: string, str: string)=>{
  return str.split(delimiter);
}

/* List to String */
export const Implode: Function = (glue: string, pieces: any)=>{
  return pieces.join(glue);
}