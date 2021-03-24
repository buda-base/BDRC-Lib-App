/**
 * Generally these are collections of works rather than a work broken down into parts
 *
 * The very top level of a "WorkPart" file is an array of WorkPartItem objects,
 * so, something like:
 *
 * 	[WorkPartItemJSON,WorkPartItemJSON,WorkPartItemJSON,...]
 *
 *  MW21939 - loads large file. shows empty titles
 *
 */
export interface WorkPartItemJSON {
  id:string;
  t:string[];	            // title
  n?:WorkPartItemJSON[];  // more parts
}





// /**
//  * This type represents what is displayed inside of a work part file. All work part
//  * files are named the exact same name as the work that they represent. Only one per
//  * work. Each node in the work part may have sub nodes
//  *
//  */
// export interface WorkPartJSON {
// 	workTitle:Array<string>;
// 	nodes:Array<WorkPartNodeJSON>;
// }
//
// export interface WorkPartNodeJSON {
// 	id:string;
// 	title:Array<string>;
// 	nodes:Array<WorkPartNodeJSON>;
// }

