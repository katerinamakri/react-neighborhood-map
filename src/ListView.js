import React, { Component } from 'react';
import './App.css';

class ListView extends Component {

	render() {
		return  (
	        	// <h2>Find Your Space</h2>
	        // <div className="listview-container">	
	           	<ul className="list">
	            	{this.props.markers.map( (marker, index) => (
	            		<li key={index}>
	            			<h3 onClick={() => this.props.onToggleOpen(index)}> 
	            				{ marker.title}
	            			</h3> 
	            		</li>
	        		))}
	           	</ul>
	        // </div>
	    )
	}
}

export default ListView