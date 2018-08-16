import React, { Component } from 'react';
import './App.css';
import SiderMenu from './SiderMenu.js';
import { withGoogleMap, GoogleMap, Marker  } from 'react-google-maps';
import { InfoWindow } from "react-google-maps";
import escapeRegExp from 'escape-string-regexp';

const defaultMarkers = [
  {id:'0', title:'Stone Soup', position: {lat: 37.9829726, lng: 23.733437500000036} },
  {id:'1', title:'The Cube Athens', position: {lat: 37.98540609999999, lng: 23.732070600000043} },
  {id:'2', title:'Found.ation', position: {lat: 37.975227, lng: 23.710912000000008} },
  {id:'3', title:'Impact HUB Athens', position: {lat: 37.9780164, lng: 23.724694399999976} },
  {id:'4', title:'Orange Grove Athens', position: {lat: 37.970619, lng: 23.740566} },
  {id:'5', title:'IQBILITY', position: {lat: 37.959137, lng: 23.717693} },
  {id:'6', title:'The HUB Events', position: {lat: 37.9743248, lng: 23.71039429999996} },      
  {id:'7', title:'Regus Athens', position: {lat: 38.055694, lng: 23.812263} },
  {id:'8', title:'Synergy Project', position: {lat: 37.967843, lng: 23.729773} },
  {id:'9', title:'Tzaferi 16', position: {lat: 37.97460360000001, lng: 23.707782199999997} }
];

class App extends Component {

  state = {
    markers: defaultMarkers,
    formattedAddresses:[],
    isSiderMenuOpen:true,
    isInfoWindowClosed:true,
    selectedPlace:[],
    query:'' 
  }

  //by https://developers.google.com/maps/documentation/javascript/events
  gm_authFailure() {
    alert('An error occurred while loading a map.  See error log for more information')
  }

  //actions when info window opens
  openInfoWindow = (index) => {
    //open info window
    this.setState({
      isInfoWindowClosed: !this.state.isInfoWindowClosed, 
      selectedPlace:index
    })    
    
    //takes the data from fourquare api
    const marker = this.state.markers[index];
    this.fetchFoursquareDataForLocation(marker.position.lat, marker.position.lng);

  }

  closeInfoWindow = (index) => {
    this.setState({
      isInfoWindowClosed: !this.state.isInfoWindowClosed, 
      selectedPlace:index
    })     
  }

  //handle hamburger icon
  toggleSiderMenu (){
    if (this.state.isSiderMenuOpen) {
      this.setState({isSiderMenuOpen: false})
    } else {
      this.setState({isSiderMenuOpen: true})
    }   
  } 

  updateQuery = (query) => {
    
    if (query){
      this.setState({ query })
        
      const match = new RegExp(escapeRegExp(this.state.query), 'i');

      let searchingResults = this.state.markers.filter((marker) => match.test(marker.title))

      this.setState({markers: searchingResults})
    } else {
      
      this.setState({
        query: '',
        markers: defaultMarkers,
      })
      // console.log(this.state.markers)
    }         
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
    this.fetchFoursquareDataForLocation();    
  }

  fetchFoursquareDataForLocation(lat, lng) {
    let apiURL

    if( lat === undefined && lng === undefined){
      apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=HMTYW22YKAJ4XBTYTHWPFHEIACSMDPFH5SL1X0KZ5JT2OK0C&client_secret=E5JNUFSA1QD2HP2NBRTVWOETGX1THPSPOTMBDAX4KLSQTB3Y&v=20180323&limit=1&near=Athens, Greece'
    } else {
      apiURL = `https://api.foursquare.com/v2/venues/search?client_id=HMTYW22YKAJ4XBTYTHWPFHEIACSMDPFH5SL1X0KZ5JT2OK0C&client_secret=E5JNUFSA1QD2HP2NBRTVWOETGX1THPSPOTMBDAX4KLSQTB3Y&v=20180323&limit=1&ll=${lat},${lng}`
    }

    fetch( apiURL )
    .then((response) => {
        // Code for handling API response
        return response.json();
    })
    .then((data) => {
      // console.log("fetched data", data);

      if (data.response === undefined){
        console.log ('No data')
      } 
        this.setState({
          formattedAddresses: data.response.venues[0].location.formattedAddress 
        })  

    })
    .catch((error) => {
        // Code for handling errors
        console.log(error)
    });
  }

  render() {
    //create map with markers
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat: 37.9838109, lng: 23.727539} }
        defaultZoom = { 12 }
        tabIndex="-1"
      >
      {this.state.markers.map( (marker, index) => (        
        <Marker 
          tabIndex="-1"
          title={marker.title} 
          position={marker.position} 
          onClick={() => this.openInfoWindow(index)}
          key={index}
          animation={(this.state.selectedPlace === index) ? window.google.maps.Animation.BOUNCE : null}
        >
          {(this.state.selectedPlace === index) && 
            <InfoWindow onCloseClick={this.closeInfoWindow}>
              <div className="info">
                <div id='infowindow' style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  <h3 tabIndex="0">{ marker.title }</h3>            
                  <p tabIndex="0">{this.state.formattedAddresses[0]}</p>
                  <p tabIndex="0">{this.state.formattedAddresses[1]}</p>
                  <p tabIndex="0">{this.state.formattedAddresses[2]}</p>
                </div>  
              </div>
            </InfoWindow>}
        </Marker>
      ))}
      </GoogleMap>
    ));    

    return (
      <div className="App">
        <div className="App-header">
          <button tabIndex="0" aria-label="hamburger button" onClick={() => this.toggleSiderMenu()}> <i className="fas fa-bars"></i> </button>       
          <h1 className="App-title" tabIndex="0">Co-working Spaces in Athens</h1>
        </div>

        <div className="container" role="application">
          <SiderMenu 
            updateQuery={this.updateQuery}
            markers={this.state.markers} 
            isSiderMenuOpen={this.state.isSiderMenuOpen}
            openInfoWindow={this.openInfoWindow}
          />
          <Map 
            containerElement={ 
                <div 
                  className="containerElement" 
                  tabIndex="0" 
                  aria-label="map with markers"
                /> 
            }
            mapElement={ <div tabIndex="-1" style={ {height:`100%`} } />}
          />
        </div>  
      </div>
    );
  }
}

export default App;
