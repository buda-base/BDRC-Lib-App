import * as React from 'react';
import { Icon } from 'react-onsenui';
import { DatabaseResult } from '../DatabaseResult';
import { observer } from 'mobx-react';

interface P_SearchResult {
	item:DatabaseResult;
	selectItem:(result:DatabaseResult)=>void;
}

@observer
export class SearchResult extends React.Component<P_SearchResult> {

	handleSelect = (e:any) => {
		this.props.selectItem(this.props.item);
	}

	render(){
		let icon = null;
		// let subtitle = null;

		if(this.props.item.type==='Person'){
			icon = <Icon icon="md-account-circle" modifier="material" size={{default: 40, material: 36}}/>;
		} else if(this.props.item.type==='Work'){
			icon = <Icon icon="md-collection-text" modifier="material" size={{default: 40, material: 36}}/>;
		} else {
			icon = <Icon icon="md-file-text" modifier="material" size={{default: 40, material: 36}} style={{marginLeft: '4px'}} />;
			// subtitle = this.props.item.workTitleForOutline();
		}

		return (
		  <li className="list-item list-item--material" onClick={this.handleSelect}>
		    <div className="list-item__left list-item--material__left">
					{icon}
		    </div>
		    <div className="list-item__center list-item--material__center">
		      <div className="list-item__title list-item--material__title title" style={{lineHeight:'36px'}}>{this.props.item.title}</div>
		      {/*null!=subtitle?<div className="list-item__subtitle list-item--material__subtitle">{subtitle}</div>:null*/}
		      {/*<div className="list-item__subtitle list-item--material__subtitle">{this.props.item.nodeId}</div>*/}
		    </div>
		  </li>
		);
	}
}


