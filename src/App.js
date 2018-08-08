import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SiderMenu from './SiderMenu.js';
import Header from './Header.js';
import { withGoogleMap, GoogleMap, Marker  } from 'react-google-maps';
import { InfoWindow } from "react-google-maps";

class App extends Component {

  state = {

    markers:[
      {id:'0', title:'Stone Soup', position: {lat: 37.9829726, lng: 23.733437500000036} },
      {id:'1', title:'Found.ation', position: {lat: 37.975227, lng: 23.710912000000008} },
      {id:'2', title:'Loft2work', position: {lat: 37.98035529999999, lng: 23.71338609999998} },    
      {id:'3', title:'Synergy Project', position: {lat: 37.96783479999999, lng: 23.72979429999998} },
      {id:'4', title:'The HUB Events', position: {lat: 37.9743248, lng: 23.71039429999996} },      
      {id:'5', title:'Impact HUB Athens', position: {lat: 37.9780164, lng: 23.724694399999976} },
      {id:'6', title:'Orange Grove Athens', position: {lat: 37.9706072, lng: 23.740549500000043} },
      {id:'7', title:'Tzaferi 16', position: {lat: 37.97460360000001, lng: 23.707782199999997} },
      {id:'8', title:'The Cube Athens', position: {lat: 37.98540609999999, lng: 23.732070600000043} }
    ],
    isInfoWindowClosed:true,
    selectedPlace:[]

  }

  onToggleOpen = (index) => {
    // console.log('works')
    if (this.state.isInfoWindowClosed) {
      this.setState({isInfoWindowClosed: false, selectedPlace:index})
    } else {
      this.setState({isInfoWindowClosed: true, selectedPlace:[]})
    }
    // console.log(this.state.selectedPlace)
  }

  render() {

    const locations = this.state
    //create map with markers
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat: 37.9838109, lng: 23.727539} }
        defaultZoom = { 13 }
      >
      {locations.markers.map( (marker, index) => (        
        <Marker 
          title={marker.title} 
          position={marker.position} 
          onClick={() => this.onToggleOpen(index)}
          key={index}
        >
          { (this.state.isInfoWindowClosed === false) && (this.state.selectedPlace === index) && 
            <InfoWindow onCloseClick={this.onToggleOpen}>
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
      <div className="App">
        <Header />
        <div className="container">
          <SiderMenu 
            markers={this.state.markers} 
            onToggleOpen={this.onToggleOpen}
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
