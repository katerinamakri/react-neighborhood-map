import React, { Component } from 'react';
import './App.css';

class ListView extends Component {

	render() {
		return  (
			<ul className="list" aria-label="list with coworking spaces">
				{this.props.markers.map( (marker, index) => (
					<li key={index} tabIndex="0" onClick={() => this.props.openInfoWindow(index)} onKeyPress={() => this.props.openInfoWindow(index)}> 
						<a>
	            			{ marker.title}
						</a>          				
					</li> 
				))}
			</ul>
	    )
	}
}

export default ListView