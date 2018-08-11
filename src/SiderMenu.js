import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.js';

class SiderMenu extends Component {

	render() {
		let displaySiderMenu = this.props.isSiderMenuOpen ? "block" : "none";

		return  (
			
			<div className="sidermenu-container" style={{ display: displaySiderMenu }}> 
				<div className="search-places-input-wrapper">
					<input 
						className="search-places"
		       	type="text" 
		       	placeholder=" Search"
		       	value ={this.props.query}
		       	onChange={(event) => this.props.updateQuery(event.target.value)}
			    />				
		    </div>

	     	<ListView 
	     		markers={this.props.markers} 
	     		handleInfoWindow={this.props.handleInfoWindow}
	     	/>
	    </div>
	  )
	}
}

export default SiderMenu