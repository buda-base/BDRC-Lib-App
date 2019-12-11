
import * as React from 'react';
import {observer} from 'mobx-react';

import AppState from './AppState';

import './AboutPage.pcss';

interface P_AboutPage {
  appState:AppState;
}

@observer
export default class AboutPage extends React.Component<P_AboutPage> {
  render() {    
    if('en'===this.props.appState.strings.id) {
      return <EnglishAbout appState={this.props.appState} />;
    } else if('cn'===this.props.appState.strings.id) {
      return <ChineseAbout appState={this.props.appState} />;
    } else  {
      return <TibetanAbout appState={this.props.appState} />;
    }
  }
}

const ChineseAbout = (props:{appState:AppState}) => 
  <div className="aboutPageContent">
    <p>我们遵循著作版权法。馆藏中大多数的书都属于公有领域，而我们所有的书目信息都遵循创作共享（CC）原则。这代表任何人都可以使用及与他人分享。但是，我们收藏的部分书籍因仍受版权保护，在这种情况下，我们依循版权法中“合理使用”的规定，只提供书中的几个页面供读者参考。</p>
    <p>您可以在开源<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache许可证</a>的<a href="https://github.com/BuddhistDigitalResourceCenter/BDRC-Lib-App/" target="_blank">Github</a>中免费取得这个开源应用程序的程序码。 </p>
    <p>请参考 <a href={props.appState.libraryServer.url+"/#!footer/about/tou"} target="_blank">使用条款</a>中 的其他信息。</p>
  </div>
;

const TibetanAbout = (props:{appState:AppState}) => 
  <div className="aboutPageContent">
    <p>ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས་(BDRC)ནི་རྒྱལ་སྤྱིའི་སྟེང་གི་ཁེ་མེད་ཚོགས་པ་ཞིག་ཡིན་ཞིང་། ང་ཚོས་བཟོས་པའི་མཉེན་ཆས་འདི་ནི་ནང་སྟན་རིག་གནས་དོན་གཉེར་ཅན་ཡོངས་ཀྱི་དགོས་མཁོར་དམིགས་ཏེ་རིན་མེད་ངང་བཀྲམས་ཡོད། ང་ཚོའི་དཔེ་མཛོད་ནང་བཞུགས་པའི་དཔེ་ཆ་ཕལ་ཆེ་བ་ནི་བདག་དབང་གི་དུས་ཚོད་ཡོལ་ཏེ་<a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">སྤྱི་སྤྱོད་ཁྱབ་ཁོངས་</a>སུ་ཚུད་ཡོད་ཅིང་། <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">རྒྱལ་སྤྱིའི་བཀག་རྒྱ་མེད་པའི་བདག་དབང་</a>དང་མཐུན་པར་ཐུན་མོང་ལ་དབང་བས་ན། དོན་གཉེར་ཅན་ཡོངས་ཀྱིས་སོ་སོའི་འདོད་མོས་ལྟར་དུས་དང་རྣམ་པ་ཀུན་ཏུ་རིན་མེད་ངང་དེ་དག་ལ་ལོངས་སུ་སྤྱོད་ཆོག</p>
    <p>ང་ཚོའི་དཔེ་ཆ་ཁག་ཅིག་ལ་ད་དུང་བདག་དབང་ཡོད་པས་ཚུལ་མཐུན་བཀོལ་སྤྱོད་ཀྱི་ལམ་ལུགས་དང་མཐུན་པར་དཔེ་ཆའི་གོང་འོག་གི་ཤོག་ངོས་ཉུང་ཤས་ཤིག་ལས་སྤེལ་མེད།</p>
    <p>མཉེན་ཆས་འདི་ཉིད་ཀྱི་གྲུབ་ཆའི་མ་ལག་ཀྱང་བདག་དབང་གིས་མ་བཟུང་བར་མངོན་གསལ་མ་ལག་གི་རྩ་འཛིན་ལས་<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">ཨ་ཕ་ཅིའི་ཆོག་མཆན་</a>འོག་<a href="https://github.com/BuddhistDigitalResourceCenter/BDRC-Lib-App/" target="_blank">གྷི་ཐོབ་དྲ་ཚིགས་</a>སུ་བཞག་སྟབས་སུས་ཀྱང་རིན་མེད་ངང་ཕབ་ལེན་བྱེད་ཆོག་པ་ཡིན།</p>
    <p>ཞིབ་ཕྲ་མཁྱེན་འདོད་ཚེ་ང་ཚོའི་<a href={props.appState.libraryServer.url+"/?locale=bo#!footer/about/tou"} target="_blank">དྲ་ཚིགས་ཀྱི་སྒྲིག་གཞི་</a>ཡིག་ཆ་ལ་གཟིགས་པར་ཞུ།</p>
  </div>
;

const EnglishAbout = (props:{appState:AppState}) => 
  <div className="aboutPageContent">
    <p><strong>BDRC</strong> is a registered <strong>non-profit</strong>. Our app is absolutely <strong>free</strong>, with no advertising or paywalls.</p>
    <p>We follow copyright law. Most of the books in our library are in the “<a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">public domain</a>” and all of our bibliographic info is <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">creative commons CC0</a>. This means that anyone can use and share them freely, forever. But some books in our collection are <strong>copyrighted</strong>—then, we use the “fair use” exception to provide a small set of pages from the book.</p>
    <p>You can get the code of this open-source app, for free, on <a href="https://github.com/BuddhistDigitalResourceCenter/BDRC-Lib-App/" target="_blank">Github</a>, under the open-source <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License</a>.</p>
    <p>Please refer to the <a href={props.appState.libraryServer.url+"/#!footer/about/tou"} target="_blank">terms of use</a> for additional information.</p>
  </div>
;