import React, { Component } from 'react';
// import '/src/App.css';
import { withGoogleMap, GoogleMap, Marker  } from 'react-google-maps';

class Map extends Component {

	state = {

		markers:[
			{id:'0', title:'Peñarrubia Lounge', position: {lat: 37.9096217, lng: 23.711298700000043} },
			{id:'1', title:'Apolis lounge & beat', position: {lat: 38.04596189999999, lng: 23.686566399999947} },
			{id:'2', title:'Psatha beach', position: {lat: 38.1113564, lng: 23.218201399999998} },		
		   	{id:'3', title:'Loukoumi Bar', position: {lat: 37.976625, lng: 23.724107000000004} },
		   	{id:'4', title:'Vromopousi beach', position: {lat: 37.7781982, lng: 24.082048699999973} },			
			{id:'5', title:'Juicy Grill Athens', position: {lat: 37.9987607, lng: 23.800052600000072} },
			{id:'6', title:'LUKUMADES', position: {lat: 37.9769549, lng: 23.727639700000054} }
		]
	}

  render(){
  	// const google = window.google
  	const locations = this.state.markers
  	const GoogleMapExample = withGoogleMap(props => (
  		<GoogleMap
  			defaultCenter = { {lat: 37.9838109, lng: 23.727539} }
  			defaultZoom = { 10 }
  		>
			{locations.map( (marker) => (	   
				<Marker 
					title={marker.title} 
					position={marker.position} 
					key={marker.id}
				/>  	
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