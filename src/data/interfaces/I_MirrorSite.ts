import {I_LangString} from "./I_LangString";
import {bo, cn, en} from "../LocalizedStrings";

export interface I_MirrorSite {
  id:string,
  metaDataUrl:string;
  name:I_LangString[];
}


export const Mirrors: {
  International:I_MirrorSite,
  China:I_MirrorSite,
  Custom:I_MirrorSite,
} = {

      International: {
        id:'us-east-1',
        metaDataUrl:'https://staticfiles.bdrc.io/BDRCLibApp/1.2/current.json',
        //metaDataUrl:'https://ssapi.hrdcstl.com:4443/library-meta-data.json',
        name:[
          {
            value:en.International,
            language:'en',
          },
          {
            value:bo.International,
            language:'bo',
          },
          {
            value:cn.International,
            language:'cn',
          },
        ],
      },


      China: {
        id:'china-1',
        metaDataUrl:'http://buda.zju.edu.cn/BDRCLibApp/1.2/current.json',
        // metaDataUrl:'https://ssapi.hrdcstl.com:4444/library-meta-data.json',
        name:[
          {
            value:en.China,
            language:'en',
          },
          {
            value:bo.China,
            language:'bo',
          },
          {
            value:cn.China,
            language:'cn',
          },
        ],
      },



      Custom: {
        id:'custom',
        metaDataUrl:'',
        name:[
          {
            value:'Custom',
            language:'en',
          },
          {
            value:'[Custom (bo)]',
            language:'bo',
          },
          {
            value:'[Custom (cn)]',
            language:'cn',
          },
        ],
      },


  };
