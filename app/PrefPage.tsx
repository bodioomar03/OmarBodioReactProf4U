import React from "react";
import { Text, View } from "react-native";


function PrefPage() {
    return (
        <View style={{backgroundColor: "#DC661F"}}>
            <Text style={{fontSize: 30, textAlign: 'center'}}>Preferences</Text>
            <Text style={{fontSize: 20, textAlign: 'center'}}>This is the preferences page</Text>
        </View>
        
    );
}

export default PrefPage;