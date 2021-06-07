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
  // recursive search required, non-top-level work part
  if(-1!=lastUnderscoreIdx) {
    baseRid = workPartId.substring(0,lastUnderscoreIdx);
    let parent:any|null = null;
    let foundPart:any|null = null;
    const _findWorkPart = (part:any, id:string, prevParts:string[]|null) => {
      if (part.n && part.n.length > 0 && !foundPart) {

        for (let i = 0; i < part.n.length; i++) {
          const prevPartsL = prevParts ? prevParts.slice() : [];
          prevPartsL.push(part.id);

          if (part.n[i].id === id) {
            parent = {'id': part.id, 't': part.t};
            foundPart = part.n[i];
            return true;
          } else {
            // console.log(parts[i].id + ' no match');

            if (_findWorkPart(part.n[i], id, prevPartsL)) {
              return true;
            }
          }
        }
      }
      return false;
    }
    _findWorkPart({ 'id':baseRid, 't':['top'], "n":json[baseRid] }, workPartId, null);
    return {part:foundPart, parent:parent};
  }
  // Top level, no search required
  else {
    return { part:{ 'id' : workPartId, t:'top', 'n':json[workPartId] }, parent:null};
  }



}

