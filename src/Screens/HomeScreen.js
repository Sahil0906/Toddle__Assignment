import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Text, Alert } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import ResultList from '../Components/ResultList';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from "react-native-dialog";


const HomeScreen = () => {

    const [item, setItem] = useState('')
    const [result,setResult] = useState([])
    const [visible,setVisible] = useState(false);
    const [editId,setEditId] = useState(null);
    const [val,setVal] = useState('')
    const [query,setQuery] = useState('')


    const onhandleSubmit = async() => {
        if(item.length<5){
            Alert.alert('Shold be atleast 5 character long!!')
            return
        }
        try{
            let id = await AsyncStorage.getItem('id')
            if(id==null){
                id = 0
            }
            const x = [...result,{description:item,pending:true,id:id.toString()}]
            setResult(x)
            await AsyncStorage.setItem('id',JSON.stringify(parseInt(id)+1));
            setItem('')
            await AsyncStorage.setItem('todoList',JSON.stringify(x));
        }catch(err){
            console.log('Error in storing the data',err)
        }
    }

    const handleOnDelete =async (id) => {
        const x = result.filter(data => data.id != id)
        setResult(x)
        await AsyncStorage.setItem('todoList',JSON.stringify(x));
    }

    const onhandleEdit = (id) => {
        const old_val = result.filter((item) => item.id==id)
        setVal(old_val[0].description)
        setVisible(true)
        setEditId(id)
    }

    const onhandleStatus = async (id) => {
        const newResult = result.map((item) => {
            if(item.id==id){
                const updatedItem = {
                    ...item,
                    pending:!item.pending
                };

                return updatedItem
            };
            return item;
        });
        await AsyncStorage.setItem('todoList',JSON.stringify(newResult));
        setResult(newResult);
    }

    const saveEdit =async () => {
        if(val.length<5){
            Alert.alert('Shold be atleast 5 character long!!')
            return
        }
        const newResult = result.map((item) => {
            if(item.id==editId){
                const updatedItem = {
                    ...item,
                    description:val
                };

                return updatedItem
            };
            return item;
        });
        await AsyncStorage.setItem('todoList',JSON.stringify(newResult));
        setResult(newResult);
        setVisible(false);
    }

    const getData = async() => {
        try{
            let data = await AsyncStorage.getItem('todoList');
            data = JSON.parse(data)
            if(data!=null){
                setResult(data);
            }
        }catch(error){
            console.log('Error in fetching data',error);
        }
    }

    useEffect(() => {
        getData();
    },[])
    
    return(
        <View style={styles.cont}>
            <TextInput 
                style={{borderWidth:1,marginHorizontal:10,marginTop:10,borderRadius:50,height:40,borderColor:'rgb(194, 194, 194)',paddingHorizontal:20}}
                placeholder='Search'
                onChangeText={(text) => setQuery(text)}
                value={query}
            />
            <SafeAreaView>
                {result.length==0 ? <Text style={{alignSelf:'center',marginTop:'70%',color:'gray',fontSize:17}}>Please add something!!</Text> : null}
                <FlatList 
                    data = {result.filter(listItem => listItem.description.toLowerCase().includes(query.toLowerCase()))}
                    keyExtractor={item => item.id}
                    renderItem = {({item}) => {
                        return <ResultList result={item} ondelete={(id) => handleOnDelete(id)} onEdit={(id) => onhandleEdit(id)} onChangeStatus={(id) => onhandleStatus(id)}/>
                    }}

                />
            </SafeAreaView>
            <View style={{flexDirection:'row',position:'absolute',bottom:0, borderWidth:1,paddingVertical:5,backgroundColor:'white',borderColor:'white',elevation:24}}>
                <TextInput 
                    style={{borderWidth:1,marginLeft:10,width:'85%',borderRadius:50,height:40,borderColor:'rgb(194, 194, 194)',paddingHorizontal:20}}
                    placeholder='I want to...'
                    onChangeText={setItem}
                    value={item}
                />
                <TouchableOpacity activeOpacity={0.9} style={{marginTop:3,marginLeft:10}} onPress={onhandleSubmit}>
                    <AntDesign name='pluscircle' size={30} color='rgb(0, 174, 255)'/>
                </TouchableOpacity>
            </View>
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Edit List</Dialog.Title>
                    <Dialog.Input style={{borderBottomWidth:1}} multiline={true} onChangeText={(val) => setVal(val)}>
                        {val}
                    </Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={() => setVisible(false)}/>
                    <Dialog.Button label="Save" onPress = {() => saveEdit()}/>
                </Dialog.Container>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cont:{
        flex:1
    }
})

export default HomeScreen;