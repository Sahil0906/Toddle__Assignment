import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const PendingList = ({result}) => {

    return( 
        <View style={{flexDirection:'row',paddingVertical:15,paddingLeft:25,alignItems:'center',borderWidth:1,marginHorizontal:10,marginVertical:10,borderRadius:10}}>
            <Text style={{marginLeft:20,fontSize:17}}>{result.description}</Text>
        </View>

    )
}

const styles = StyleSheet.create({

});

export default PendingList;