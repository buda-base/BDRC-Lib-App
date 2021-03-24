import {PersonRefJSON} from "./PersonRefJSON";


/**
 * Used in Records.ts to describe the content of the Work JSON file
 *
 * test:
 * MW12827
 *
 */

export interface WorkJSON {
  creator: Array<string>;
  title: Array<string>;
  pn: string;             // publisherName
  pl: string;             // publisherLocation
  pd: string;             // publisherDate
  hasParts: boolean;
  pt: string;             // printType
}
