import React, { Component } from 'react';
// import '/src/App.css';
import { withGoogleMap, GoogleMap, Marker, InfoWindow  } from 'react-google-maps';

class Map extends Component {


  render(){
  	// const google = window.google
  	
    const {locations,containerElement,mapElement, onToggleOpen}=this.props
    //create map with markers
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat: 37.9838109, lng: 23.727539} }
        defaultZoom = { 10 }
      >
      {this.props.map( (marker, index) => (        
        <Marker 
          title={marker.title} 
          position={marker.position} 
          onClick={() => this.onToggleOpen(index)}
          key={index}
        >
          { (this.props.isInfoWindowClose === false) && (this.state.selectedPlace === index) && 
            <InfoWindow onCloseClick={() => this.onToggleOpen(index) }>
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

    return(
      <div className='container'>
      	<GoogleMapExample 
      		containerElement={ <div style={ {height:`550px`, width:`100%`} } /> }
      		mapElement={ <div style={ {height:`100%`} } />}
      	/>
      </div>
    );
  }
};
export default Map;