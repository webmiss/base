/* String to List */
export const Explode = (delimiter: string, str: string)=>{
  return str.split(delimiter);
}

/* List to String */
export const Implode = (glue: string, pieces: any)=>{
  return pieces.join(glue);
}