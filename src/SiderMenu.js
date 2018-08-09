import React, { Component } from 'react';
import './App.css';
import ListView from './ListView.js';

class SiderMenu extends Component {

	constructor(props) {
	    super(props)

		this.state = {
			query:'', 
			placesResults:[]
		}		
	}



	render() {
		let displaySiderMenu = this.props.isSiderMenuOpen ? "block" : "none";


		return  (
			
			<div className="sidermenu-container" style={{ display: displaySiderMenu }}> 

				<div className="search-books-input-wrapper">
					<input 
		               	type="text" 
		               	placeholder="Search co-working spaces"
		               	value ={this.state.query}
		               	onChange={(event) => this.updateQuery(event.target.value)}
			        />				
		        </div>

	        	<ListView 
	        		markers={this.props.markers} 
	        		onToggleOpen={this.props.onToggleOpen}
	        	/>
	        </div>

	    )
	}
}

export default SiderMenu