import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.js';

class SiderMenu extends Component {



	render() {

		// let btn_class = this.state.displayBlock? "displayBlock" : "displayNone";
		return  (
			//inside div --> search component
	        <div className="sidermenu-container">        	
	        	<ListView 
	        		markers={this.props.markers} 
	        		onToggleOpen={this.props.onToggleOpen}
	        	/>
	        </div>

	    )
	}
}

export default SiderMenu