import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


function PrefPage() {

    const navigation = useNavigation();
    const onButtonPress = () => {
        navigation.goBack()
    };
    const route = useRoute<{ params: {preferences: string[]} } & { key: string, name: string }>();
    const preferences = route.params;
    console.log(preferences + " preferences");
    return (
        <View style={styles.background}>
            <Text style={styles.title}>Preferences</Text>
            <View style={styles.subview}>
                {(preferences as unknown as string[]).map((pref: string, index: number) => (
                    <Text key={index} style={styles.details}>{pref}</Text>
                ))}
            </View>
            <TouchableOpacity onPress={onButtonPress}>
                <View style={styles.button}>
                    <Text style={styles.textInButton}>Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    
    background: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)'
    },
    subview: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)',
        borderColor: "#DC661F",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,

    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#DC661F",
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: "#DC661F",
        marginHorizontal: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    details: {
        color: 'black',
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 10,
    },
    call: {
        fontSize: 24,
        backgroundColor: "#DC661F",
        marginHorizontal: 100,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    button: {
        backgroundColor: "#DC661F",
        fontSize: 24,
        margin: 5,
        borderRadius: 10,
        
        
    },
    textInButton: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default PrefPage;