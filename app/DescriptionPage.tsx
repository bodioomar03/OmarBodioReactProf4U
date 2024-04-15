/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




function DescriptionPage() {

    const navigation = useNavigation();
    const onButtonPress = () => {
        navigation.goBack()
    };
    const route = useRoute<{ params: { id: number, name: string, company_name: string, phone: string, address: string, email: string, website: string} } & { key: string, name: string }>();
    const { id, name , company_name, phone, address, email, website} = route.params;

    return (
        <SafeAreaView>
            <View style={styles.background}>
            <Text style={styles.details}>name: {name}</Text>
            <Text style={styles.details}>address: {address}</Text>
            <Text style={styles.details}>phone number:  {phone}</Text>
            <Text style={styles.details}>email: {email}</Text>
            <Text style={styles.details}>last company information</Text>
            <Text style={styles.details}>name: {company_name}</Text>
            <Text style={styles.details}>website: {website}</Text>
            <TouchableOpacity onPress={onButtonPress}>
                <View style={styles.button}>
                    <Text style={styles.textInButton}>Back</Text>
                </View>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)'
    },
    details: {
        fontSize: 20,
        paddingLeft: 20,
        marginTop: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 51, 0, 0.8)',
        paddingHorizontal: 10,
        fontSize: 24,
        paddingVertical: 20,
        borderRadius: 10,
    },
    textInButton: {
        color: 'white',
        fontSize: 20,
    }
});
export default DescriptionPage;