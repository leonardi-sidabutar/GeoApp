import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, {Polygon, Marker} from 'react-native-maps';
import config from '../../config/config';
import { provContext } from '../../context/context';

export default function Map() {

  // Context
  const {selectUnit} = provContext();

  // State
  const [kebun, setKebun] = useState(null)
  const [detail, setDetail] = useState(null)

  // Function parseGeoJSON
  const parseGeoJson = (geoJsonData) => {
    const polygons = [];
  
    geoJsonData.features.forEach((feature) => {
      const { geometry, properties } = feature;

      // Jika Polygon
      if (geometry.type === "Polygon") {
        polygons.push({
          coordinates: geometry.coordinates[0].map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          })),
          color: '#FFF000',
          info:properties
        });
      }
  
      // Jika MultiPolygon
      if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon) => {
          polygons.push({
            coordinates: polygon[0].map(([lng, lat]) => ({
              latitude: lat,
              longitude: lng,
            })),
            color: '#FFF000',
            info:properties
          });
        });
      }
    });
  
    return polygons;
  };

  useEffect(()=>{
    const fetchKebun = async()=>{
      try {
        const res = await axios.get(`${config.base_url}`,{
          params:{
            where:'1=1',
            outFields:'*',
            f:'Geojson',
            token:'mzFcMRqhxzPAoRJavp2MJhpXDEFmwN5TTyYQ76_IAjz4Mm_Nunp_1pQ0U0nJNr9PfcPbLTg_n3nOCNUlI60DUbciaL3ppnFsSCvcRNq5Bq_6Y5eJRkqA7PZkfLNzCxcf0AeuGTaKoIsYFZZ5bos-QjoRVUUb0wnJ9WdPFCAbl9uQLNZo4VsuQwl172xXf6Xp'
          }
        })        
        setKebun(parseGeoJson(res.data))
      } catch (error) {
        console.error(error,'Error Fetching Kebun')
      }
    }
    fetchKebun();
  },[])

  useEffect(()=>{
    if(selectUnit){
      setDetail(selectUnit)
    }
  },[selectUnit])

  // Function untuk zoom Maps Ref
  const calculateRegion = (coords) => {
    let minLat = coords[0].latitude;
    let maxLat = coords[0].latitude;
    let minLng = coords[0].longitude;
    let maxLng = coords[0].longitude;

    coords.forEach(coord => {
      if (coord.latitude < minLat) minLat = coord.latitude;
      if (coord.latitude > maxLat) maxLat = coord.latitude;
      if (coord.longitude < minLng) minLng = coord.longitude;
      if (coord.longitude > maxLng) maxLng = coord.longitude;
    });

    // Memberikan ruang tambahan untuk zoom out agar semua marker terlihat
    const latitudeDelta = maxLat - minLat;
    const longitudeDelta = maxLng - minLng;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: latitudeDelta * 1.2,  // Tambahkan faktor zoom out
      longitudeDelta: longitudeDelta * 1.2,
    };
  };
  


  return (
    <View style={styles.container}>
    <MapView
      mapType='hybrid'
      style={styles.map}
      region={
        detail ? calculateRegion(detail.coordinates) :
        {
          latitude: 3.5951956,
          longitude: 98.6722227,
          latitudeDelta: 0.05427490804776557,
          longitudeDelta: 0.04581380108361998,
        }
      }
      onPress={()=>setDetail(null)}
    >
        {
          kebun && (
            kebun.map((polygon, index) => (
              <Polygon
                key={index}
                coordinates={polygon.coordinates}
                strokeColor={polygon.color}
                fillColor={`${polygon.color}50`} // Tambahkan transparansi
                strokeWidth={2}
                tappable={true}
                onPress={()=>{setDetail(polygon)}}
              />
            ))
          )
        }
    </MapView>

    {
      detail && (
        <View style={{
          backgroundColor:'white',
          width:'100%',
          padding:20,
          borderTopLeftRadius:20,
          borderTopRightRadius:20}}>
          <Text>Unit : {detail.info.Kebun}</Text>
        </View>
      )
    }
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});