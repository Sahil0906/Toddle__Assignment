import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import PendingList from '../Components/PendingList';

const CompletedScreen = ({ navigation }) => {

    const [result,setResult] = useState([])

    const getdata = async () => {
        try{
            let data = await AsyncStorage.getItem('todoList');
            data = JSON.parse(data)
            const newData = data.filter(item => item.pending==false)
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
        <View style={{marginBottom:60,flex:1}}>
            <View style={{height:60,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(0, 183, 255)',borderRadius:5}}>
                <Text style={{fontSize:20,color:'white'}}>Completed Todo list</Text>
            </View>
            {result.length==0 ?
                <Text style={{alignSelf:'center',marginTop:'70%',color:'gray',fontSize:17}}>You haven't done anything yet!!</Text>
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

export default CompletedScreen;