import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import './App.css';
import ListView from './ListView.js';

class SiderMenu extends Component {

	constructor(props) {
	  super(props)

		this.state = {
			query:'', 
			locationsResults:this.props.markers
		}		
	}

	updateQuery = (query) => {
		
		if (query){
			this.setState({ query })
		    
			const match = new RegExp(escapeRegExp(this.state.query), 'i');

		  let locationsResults = this.props.markers.filter((marker)=> match.test(marker.title))

		  this.setState({locationsResults: locationsResults})
		} else {
			this.setState({query: '', locationsResults:this.props.markers})
		}       	
	}


	render() {
		let displaySiderMenu = this.props.isSiderMenuOpen ? "block" : "none";

		return  (
			
			<div className="sidermenu-container"  id="sidermenu" style={{ display: displaySiderMenu }}> 
				<div className="search-places-input-wrapper">
					<input 
						className="search-places"
		       	type="text" 
		       	placeholder=" Search"
		       	value ={this.state.query}
		       	onChange={(event) => this.updateQuery(event.target.value)}
			    />				
		        </div>

	        	<ListView 
	        		locationsResults={this.state.locationsResults}
	        		markers={this.props.markers} 
	        		onToggleOpen={this.props.onToggleOpen}
	        	/>
	    </div>
	  )
	}
}

export default SiderMenu