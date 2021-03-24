
/**
 * Describes a route that is used with the Navigation system
 *
 */
export interface Route {
  page: string;
  hasBackButton: boolean;
  isModal:boolean;
  data: any;
}
