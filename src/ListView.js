import React, { Component } from 'react';
import './App.css';

class ListView extends Component {



	render() {
		return  (
	        <div className="listview-container">	
	        	<h2>Find Your Space</h2>
	           	<ol className="list">
	            	{this.props.markers.map( (marker, index) => (
	            		<li key={index}>
	            			<h3 onClick={() => this.props.onToggleOpen(index)}> 
	            				{ marker.title}
	            			</h3> 
	            		</li>
	        		))}
	           	</ol>
	        </div>
	    )
	}
}

export default ListView