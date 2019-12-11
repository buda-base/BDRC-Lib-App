import * as React from 'react';
import * as Spinner from 'react-spinkit';	// https://github.com/KyleAMathews/react-spinkit

import './BubbleWrapper.pcss';

interface P_BubbleWrapper {
	show:boolean;
}

export class BubbleWrapper extends React.Component<P_BubbleWrapper> {
	render(){
		if(this.props.show){
			return (
				<div className="bubbleWrapper">
					<Spinner name="three-bounce" fadeIn="none" />
				</div>
			);
		} else {
			return <span></span>;
		}
	}	
}
