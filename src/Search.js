import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp';

class Search extends Component {

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

		return (

			<div className="search-places-input-wrapper">
				<input 
					className="search-places"
	               	type="text" 
	               	placeholder=" Search"
	               	value ={this.state.query}
	               	onChange={(event) => this.updateQuery(event.target.value)}
		        />				
	        </div>	
	    )
	}        

}

export default Search
