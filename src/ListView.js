import React, { Component } from 'react';
import './App.css';

class ListView extends Component {

	render() {
		return  (
	        // <div className="listview-container">	
	        	// <h2>Find Your Space</h2>
	           	<ul className="list">
	            	{this.props.markers.map( (marker, index) => (
            			<a key={index} onClick={() => this.props.openInfoWindow(index)}> 
		            		<li>
		            			{ marker.title}
		            		</li>          				
            			</a> 
	        		))}
	           	</ul>
	        // </div>
	    )
	}
}

export default ListView