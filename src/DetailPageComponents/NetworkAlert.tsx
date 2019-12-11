import * as React from 'react';
import {ILocalizedStrings} from '../LocalizedStrings';
import {AlertDialog} from 'react-onsenui';

interface P_NetworkAlert {
  strings:ILocalizedStrings;
  show:boolean;
  onClose:()=>void;
}

export class NetworkAlert extends React.Component<P_NetworkAlert> {
  render() {
    return (
      <AlertDialog
        isOpen={this.props.show}
        isCancelable={false}>
        <div className='alert-dialog-title'>{this.props.strings.Alert}</div>
        <div className='alert-dialog-content'>{this.props.strings.NoInternetMessage}</div>
        <div className='alert-dialog-footer'>
          <button onClick={this.props.onClose} className='alert-dialog-button'>{this.props.strings.OK}</button>
        </div>
      </AlertDialog>
    );
  }
}