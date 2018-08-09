import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SiderMenu from './SiderMenu.js';
// import Header from './Header.js';
import { withGoogleMap, GoogleMap, Marker  } from 'react-google-maps';
import { InfoWindow } from "react-google-maps";
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  state = {

    markers:[
      {id:'0', title:'Stone Soup', position: {lat: 37.9829726, lng: 23.733437500000036} },
      {id:'1', title:'The Cube Athens', position: {lat: 37.98540609999999, lng: 23.732070600000043} },
      {id:'2', title:'Found.ation', position: {lat: 37.975227, lng: 23.710912000000008} },
      {id:'3', title:'Impact HUB Athens', position: {lat: 37.9780164, lng: 23.724694399999976} },
      {id:'4', title:'Orange Grove Athens', position: {lat: 37.9706072, lng: 23.740549500000043} },
      {id:'5', title:'Tzaferi 16', position: {lat: 37.97460360000001, lng: 23.707782199999997} },
      {id:'6', title:'Synergy Project', position: {lat: 37.96783479999999, lng: 23.72979429999998} },
      {id:'7', title:'The HUB Events', position: {lat: 37.9743248, lng: 23.71039429999996} },      
      {id:'8', title:'Loft2work', position: {lat: 37.98035529999999, lng: 23.71338609999998} },    
    ],
    isSiderMenuOpen:true,
    isInfoWindowClosed:true,
    selectedPlace:[],
    query:''
    // searchingResults:this.state.markers    

  }

  //handle info window
  handleInfoWindow = (index) => {
      this.setState({
        isInfoWindowClosed: false, 
        selectedPlace:index
      })

    // console.log(this.state.selectedPlace)
  }

  //handle hamburger icon
  toggleSiderMenu (){
    console.log(this.state.isSiderMenuOpen)
    if (this.state.isSiderMenuOpen) {
      document.getElementById("sidermenu").style.display = "none";
      this.setState({isSiderMenuOpen: false})
    } else {
      document.getElementById("sidermenu").style.display = "block";
      this.setState({isSiderMenuOpen: true})
    }   
  } 

  
  updateQuery = (query) => {
    
    if (query){
      this.setState({ query })
        
      const match = new RegExp(escapeRegExp(this.state.query), 'i');

      let searchingResults = this.state.markers.filter((marker)=> match.test(marker.title))

      this.setState({markers: searchingResults})
    } else {
      
      this.setState({
        query: '',
        markers:[
          {id:'0', title:'Stone Soup', position: {lat: 37.9829726, lng: 23.733437500000036} },
          {id:'1', title:'The Cube Athens', position: {lat: 37.98540609999999, lng: 23.732070600000043} },
          {id:'2', title:'Found.ation', position: {lat: 37.975227, lng: 23.710912000000008} },
          {id:'3', title:'Impact HUB Athens', position: {lat: 37.9780164, lng: 23.724694399999976} },
          {id:'4', title:'Orange Grove Athens', position: {lat: 37.9706072, lng: 23.740549500000043} },
          {id:'5', title:'Tzaferi 16', position: {lat: 37.97460360000001, lng: 23.707782199999997} },
          {id:'6', title:'Synergy Project', position: {lat: 37.96783479999999, lng: 23.72979429999998} },
          {id:'7', title:'The HUB Events', position: {lat: 37.9743248, lng: 23.71039429999996} },      
          {id:'8', title:'Loft2work', position: {lat: 37.98035529999999, lng: 23.71338609999998} },    
        ]
      })
      // console.log(this.state.markers)
    }         
  }


  render() {
    //create map with markers
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat: 37.9838109, lng: 23.727539} }
        defaultZoom = { 13 }
      >
      {this.state.markers.map( (marker, index) => (        
        <Marker 
          title={marker.title} 
          position={marker.position} 
          onClick={() => this.handleInfoWindow(index)}
          key={index}
          animation={(this.state.selectedPlace === index) ? window.google.maps.Animation.BOUNCE : null}
        >
          {(this.state.selectedPlace === index) && 
            <InfoWindow onCloseClick={this.handleInfoWindow}>
              <div className="info">
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  <h3>{ marker.title }</h3>            
                  <p>works</p>
                </div>  
              </div>
            </InfoWindow>}
        </Marker>
      ))}
      </GoogleMap>
    ));    

    return (
      // const google = window.google
        // <Header isSiderMenuOpen={this.state.isSiderMenuOpen}
        ///>
      <div className="App">
        <div className="App-header">
          <button onClick={() => this.toggleSiderMenu()}> <i className="fas fa-bars"></i> </button>       
          <h1 className="App-title">Co-working Spaces in Athens</h1>
        </div>

        <div className="container">
          <SiderMenu 
            updateQuery={this.updateQuery}
            markers={this.state.markers} 
            isSiderMenuOpen={this.state.isSiderMenuOpen}
            handleInfoWindow={this.handleInfoWindow}
          />
          <Map 
            containerElement={ <div style={ {height:`642px`, width:`100%`} } /> }
            mapElement={ <div style={ {height:`100%`} } />}
          />
        </div>  
      </div>
    );
  }
}

export default App;
