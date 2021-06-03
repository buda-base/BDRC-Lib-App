/**
 *
 *
 * returns:
 *
 * {
 *   part:{
 *     id:string,
 *     t:string[],
 *     n:any[]
 *   },
 *   parent:{id:string,t:string[]}
 * }
 *
 * @param json
 * @param workPartId
 */

export const findWorkPart = (json:any, workPartId:string) => {

  let baseRid = '';
  const lastUnderscoreIdx = workPartId.lastIndexOf('_');
  if(-1!=lastUnderscoreIdx) {
    baseRid = workPartId.substring(0,lastUnderscoreIdx);
  } else {
    baseRid = workPartId;
  }


  let parent:any|null = null;
  let foundPart:any|null = null;
  const _findWorkPart = (part:any, id:string, prevParts:string[]|null) => {
    if(part.n && part.n.length>0 && !foundPart) {

      for(let i=0;i<part.n.length;i++) {
        const prevPartsL = prevParts ? prevParts.slice() : [];
        prevPartsL.push(part.id);

        if(part.n[i].id===id) {
          parent = { 'id' : part.id, 't':part.t };
          foundPart = part.n[i];
          console.log("prevParts: ", prevPartsL);
          return true;
        } else {
          // console.log(parts[i].id + ' no match');

          if(_findWorkPart(part.n[i], id, prevPartsL)){
            return true;
          }
        }
      }
    }
    return false;
  }

  //  console.log('About to find');
  _findWorkPart({ 'id':baseRid, 't':['top'], "n":json[baseRid] }, workPartId, null);
  //console.log(part);
  //console.log(parent);
  return {part:foundPart, parent:parent};
}

