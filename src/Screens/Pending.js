import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import PendingList from '../Components/PendingList';

const PendingScreen = ({ navigation }) => {

    const [result,setResult] = useState([])

    const getdata = async () => {
        try{
            let data = await AsyncStorage.getItem('todoList');
            data = JSON.parse(data)
            const newData = data.filter(item => item.pending==true)
            setResult(newData)
        }catch(error){
            console.log('Error in fetching data',error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            getdata();
        });
      
        return unsubscribe;
    },[navigation])
    
    return(
        <View style={{marginBottom:60}}>
            <View style={{height:60,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(0, 183, 255)',borderRadius:5,flexDirection:'row'}}>
                <Text style={{fontSize:20,color:'white',marginLeft:20}}>Pending Todo list</Text>
                <View style={{height:30,width:30,alignItems:'center',justifyContent:'center',marginLeft:'auto',marginRight:15,borderRadius:20,backgroundColor:'rgb(110, 108, 20)'}}>
                    <Text style={{color:'white'}}>{result.length}</Text>
                </View>
            </View>
            {result.length==0 ?
                <Text style={{alignSelf:'center',marginTop:'70%',color:'gray',fontSize:17}}>Nothing in Pending list!!</Text>
            :
                <FlatList 
                    data={result}
                    keyExtractor={item => item.id}
                    renderItem = {({item}) => {
                        return <PendingList result={item} />
                    }}
                />
            }
        </View>
    )
};

const styles = StyleSheet.create({

});

export default PendingScreen;

