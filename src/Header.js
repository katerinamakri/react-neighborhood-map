import React, { Component } from 'react';
import './App.css';

class Header extends Component {

	//handle hamburger icon
	toggleSiderMenu (){
	  console.log(this.props.isSiderMenuOpen)
	  if (this.props.isSiderMenuOpen) {
	    document.getElementById("sidermenu").style.display = "none";
	    this.props.setState({isSiderMenuOpen: false}) // error:de mporei na allaxei to state tou parent
	  } else {
	    document.getElementById("sidermenu").style.display = "block";
	    this.props.setState({isSiderMenuOpen: true})
	  }   
	} 

	render() {

		// let displaySiderMenu = this.props.isSiderMenuOpen ? "block" : "none";
		return (
	        <div className="App-header">
	          <button onClick={() => this.toggleSiderMenu()}> 
	          	<i className="fas fa-bars"></i> 
	          </button>       
	          <h1 className="App-title">Co-working Spaces in Athens</h1>
	        </div>
		)

	}
}

export default Header
