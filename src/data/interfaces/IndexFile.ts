/**
 * Used in Database.ts, defines an Index file that is loaded on the initial run
 *
 */
export interface IndexFile {
  type: string;
  filename: string;
  desc: string;
  order: number;
}
