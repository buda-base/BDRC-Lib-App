import * as React from 'react';
import {observer} from 'mobx-react';
import AppState from './AppState';

interface P_Menu {
  open:boolean;
  onClose:()=>void;
  children?: any;
}

@observer
export class Menu extends React.Component<P_Menu> {
	menuRef:any;

	componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
	}

	componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
	}

  handleClickOutside = (event:Event) => {
    if (this.menuRef && !this.menuRef.contains(event.target)) {
     this.props.onClose();
    }
  }

  setMenuRef = (node:any) => {
      this.menuRef = node;
  }

	render() {
    let popStyle:any = {
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
      borderRadius: '2px',
      position:'fixed', top:'12px', right:'10px', zIndex:'2000',
      backgroundColor:'white'
    }

		if(this.props.open) {
			return (
        <div style={popStyle} ref={this.setMenuRef}>
          <div style={{padding: '8px 0px'}}>
          	{this.props.children}
          </div>
        </div>
       );
		} else {
			return null;
		}
	}


}

interface P_SnackBar {
  appState:AppState;
}

@observer
export class SnackBar extends React.Component<P_SnackBar> {

  componentDidMount = () => {
    setTimeout(this.checkForClose, 500);
  }

  checkForClose = () => {
    if(this.props.appState.snackBarOpen) {
      let now = new Date();    
      if(this.props.appState.closeSnackBarDate < now.getTime()) {
        this.props.appState.snackBarOpen = false;
      }
    }
    setTimeout(this.checkForClose, 500);      
  }

  render() {
    let style = {
      transform: 'translate3d(0px, 100%, 0px)',
      opacity: '0',
      transition: 'all 0.35s ease'
    };
    if(this.props.appState.snackBarOpen) {
      style.opacity = '1';
      style.transform = 'translate3d(0px, 0%, 0px)'
    };
    return (
      <div className="toast toast--material" style={style}>
          <div className="message toast__message toast--material__message">{this.props.appState.snackBarMessage}</div>
      </div>
    );
  }
}




export class Divider extends React.Component {
  render() {
    return (  
      <hr style={{margin: '7px 0px 8px', height: '1px', border: 'none', backgroundColor: 'rgb(224, 224, 224)'}} />     
    );    
  }
}

@observer
export class MenuHeader extends React.Component {
  render() {
    const menuHeaderStyle:any = {
      color: 'rgba(0, 0, 0, 0.67)',
      lineHeight: '48px',
      fontSize:'13px',
      textAlign:'left',
      margin:'0px 16px'
    }
    return (
      <div style={menuHeaderStyle}>
        {this.props.children}
      </div>
    );
  }
}

interface P_MenuItem {
  onClick:(e:any)=>void;
}
@observer
export class MenuItem extends React.Component<P_MenuItem> {
  render() {
    const menuItemStyle:any ={
      color: 'rgba(0, 0, 0, 0.87)',
      lineHeight: '48px',
      fontSize:'16px',
      textAlign:'left',
      margin:'0px 16px'
    }
    return (
      <div style={menuItemStyle} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
