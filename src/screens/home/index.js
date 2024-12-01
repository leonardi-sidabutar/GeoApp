import { View, Text, TextInput, ScrollView, TouchableOpacity,Alert, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import AppStyles from '../../../Style'
import { fetchKebun } from '../../hooks/fetchKebun'
import { provContext } from '../../context/context'

const img_po = '../../assets/geo_palmoil.png'
const img_rb = '../../assets/geo_rubber.png'
const img_ho = '../../assets/geo_office.png'

export default function Home({navigation}) {

  // Context
  const {selectUnit, changeUnit} = provContext();

  // State
  const [kebun, setKebun] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [seach, setSearch] = useState('');

  // Effect
  useEffect(()=>{
    const getKebun = async()=>{
      try {
        setLoad(true);
        const result = await fetchKebun();
        setKebun(result.features);
      } catch (err) {
        setError(err.message || 'Something went Wrong');
      } finally {
        setLoad(false)
      }
    }
    getKebun();
  },[])

  // Function for Search
  const searchQuery = kebun.filter((item)=>
    item.properties.Kebun.toLowerCase().includes(seach.toLowerCase())
  );

  // Function for ParseGeoJson Selected
  const parseGeo = (data)=>{
    const polygons = [];
    const {geometry,properties} = data;
    
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
      changeUnit(polygons[0]);
      navigation.navigate('Map');
  }

  return (
    <View>
      <View style={[AppStyles.bg_green,AppStyles.home_header]}>
        <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap'}}>
          <View style={{width:'75%'}}>
            <Text style={[AppStyles.home_header_text,{color:'white'}]}>Hello, Leo</Text>
            <Text style={{fontSize:20,color:'white'}}>it's a sunny day!</Text>
          </View>
          <View style={{width:'25%',justifyContent:'center',alignItems:'flex-end'}}>
            <View style={{borderWidth:2,borderColor:'white',borderRadius:'50%',width:45,height:45,justifyContent:'center',alignItems:'center'}}>
              <Icon name={'user'} size={20} color={'white'}/>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding:20}}>
        <View style={[AppStyles.home_box,AppStyles.bg_white]}>
          <View style={[AppStyles.home_box_item]}>
            <View style={{flexDirection:'row',height:'100%'}}>
              <View style={{height:'100%',justifyContent:'center',alignItems:'center',marginRight:20}}>
                <View style={{width:50,height:50,backgroundColor:'#F4CE14',borderRadius:'50%',justifyContent:'center',alignItems:'center'}}>
                  <Icon name={'home'} size={24} color={'#45474B'}/>
                </View>
              </View>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:600,color:'gray'}}>Head Office</Text>
                <Text style={{fontSize:20,}}>1</Text>
              </View>
            </View>
          </View>
          <View style={[AppStyles.home_box_item]}>
            <View style={{flexDirection:'row',height:'100%'}}>
              <View style={{height:'100%',justifyContent:'center',alignItems:'center',marginRight:20}}>
                <View style={{width:50,height:50,backgroundColor:'#F4CE14',borderRadius:'50%',justifyContent:'center',alignItems:'center'}}>
                  <Icon name={'flask'} size={24} color={'#45474B'}/>
                </View>
              </View>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:600,color:'gray'}}>Laboratory</Text>
                <Text style={{fontSize:20,}}>1</Text>
              </View>
            </View>
          </View>
          <View style={[AppStyles.home_box_item]}>
            <View style={{flexDirection:'row',height:'100%'}}>
              <View style={{height:'100%',justifyContent:'center',alignItems:'center',marginRight:20}}>
                <View style={{width:50,height:50,backgroundColor:'#F4CE14',borderRadius:'50%',justifyContent:'center',alignItems:'center'}}>
                  <Icon name={'tint'} size={24} color={'#45474B'}/>
                </View>
              </View>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:600,color:'gray'}}>Palm Oil</Text>
                <Text style={{fontSize:20,}}>1</Text>
              </View>
            </View>
          </View>
          <View style={[AppStyles.home_box_item]}>
            <View style={{flexDirection:'row',height:'100%'}}>
              <View style={{height:'100%',justifyContent:'center',alignItems:'center',marginRight:20}}>
                <View style={{width:50,height:50,backgroundColor:'#F4CE14',borderRadius:'50%',justifyContent:'center',alignItems:'center'}}>
                  <Icon name={'tree'} size={24} color={'#45474B'}/>
                </View>
              </View>
              <View style={{height:'100%',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:600,color:'gray'}}>Rubber</Text>
                <Text style={{fontSize:20,}}>1</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding:20}}>
        <View style={[AppStyles.home_search]}>
          <TextInput
            placeholder='Search'
            value={seach}
            onChangeText={(text)=>setSearch(text)}
            style={{width:'80%'}}
            />
          <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end'}}>
            <Icon name={'search'} size={20} color={'gray'}/>
          </View>
        </View>
        <ScrollView vertical={true} style={{height:290}}>
        {
          load && (<ActivityIndicator size={'large'} color={'#379777'}/>)
        }
        {
          error && (<Text>Something Went Wrong</Text>)
        }
        {
          searchQuery.length > 0 && searchQuery.map((item,index)=>{
            return(
            <TouchableOpacity key={item.properties.OBJECTID} onPress={()=>{parseGeo(item)}} style={{backgroundColor:'white',padding:20,borderWidth:1,borderColor:'#ddd',borderRadius:10,marginBottom:10,flexDirection:'row',alignItems:'center'}}>
              {
                // For Image
                item.properties.Type === 'KS' ?  (<Image source={require(img_po)} style={{width:80,height:80,marginRight:10}}/>) :
                item.properties.Type === 'RB' ?  (<Image source={require(img_rb)} style={{width:80,height:80,marginRight:10}}/>) :
                (<Image source={require(img_ho)} style={{width:80,height:80,marginRight:10}}/>)
              }
              <View>
                <Text>Unit : {item.properties.Kebun}</Text>
                <Text>Commodity :
                  {
                    item.properties.Type === 'KS' ?  ' Oil Palm' :
                    item.properties.Type === 'RB' ?  ' Rubber' :
                    ' HO'
                  }
                </Text>
              </View>
            </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </View>
    </View>
  )
}