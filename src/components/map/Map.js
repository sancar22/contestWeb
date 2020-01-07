import React, {useState, useEffect} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import * as parkData from '../../testData/brigadistas.json'



function Map() {

    const [selectedPark, setSelectedPark] = useState(null) // Para pop-up
    const [selectedList, setSelectedList] = useState([]) // Para icono 
    const [click, setClick] = useState(false)

    React.useEffect(()=>{
            //console.log(selectedList)
       
    })

    const onMarkerClickHandler = (park) => {
            console.log(Markers)
            console.log(park.properties.PARK_ID)
            let index = Markers.findIndex(x => x.key === park.properties.PARK_ID.toString())
            console.log(index)
        
            
            //setSelectedList([...selectedList, park.properties.PARK_ID])
    
        }
      
    let Markers = parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          //onMouseOver={ ()=> 
            //setSelectedPark(park)
          //
          onClick={() => setSelectedPark(park)}
          label={park.properties.NAME}
          icon={{
              url: click ? '/icon1.png' : '/icon2.jpg',
              scaledSize: new window.google.maps.Size(25,25)
            
          }}
        />
      ))
    
      console.log(Markers)

    return (
<GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
    >
      {Markers}

    {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <img src={require('./brigada1.jpg')}/>
            <h1>Roberto Gutiérrez</h1>
            <p1>Uno de los brigadistas más destacados</p1>
           
          </div>
        </InfoWindow>
      )}

      

    </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap