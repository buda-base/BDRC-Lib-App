


/**
 * Used in Records.ts to describe the content of the Person JSON file
 *
 * P1583
 *
 */
export interface PersonJSON {
  name: Array<string>;
  co: Array<string>;    // creatorOf (work ids)
  b: string;            // birth date
  d: string;            // death date
}


export interface PersonRefJSON {
  id:string;
  name:string;
}
