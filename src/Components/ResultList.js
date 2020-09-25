import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const ResultList = ({result, ondelete, onEdit, onChangeStatus}) => {

    return(
        <View style={{flexDirection:'row',paddingVertical:10,paddingLeft:25,alignItems:'center'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => ondelete(result.id)}>
                <MaterialIcons name='cancel' size={30} color='rgb(95, 50, 122)'/>
            </TouchableOpacity>
            <Text style={{marginLeft:20,fontSize:17,width:'60%'}}>{result.description}</Text>
            <TouchableOpacity style={{marginLeft:'auto'}} activeOpacity={0.8} onPress={() => onChangeStatus(result.id)}>
                {result.pending ?
                    <MaterialIcons name='pending' size={30} color='rgb(0, 73, 191)'/>
                :
                    <AntDesign name='checkcircle' size={24} color='rgb(0, 117, 53)'/>
                }
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20,marginRight:25}} activeOpacity={0.8} onPress={() => onEdit(result.id)}>
                <AntDesign name='edit' size={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default ResultList;