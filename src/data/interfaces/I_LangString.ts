export interface I_LangString {
  value:string;
  language:string;
}

export function valueForLang(values:Array<I_LangString>|undefined, lang:string, defaultValue?:string) {
  let returnValue = defaultValue ? defaultValue : 'meta-data not available';
  if(values) {
    for(let i=0;i<values.length;i++) {
      if(values[i].language==lang) {
        returnValue = values[i].value;
        break;
      }
    }
  }
  return  returnValue;
}
