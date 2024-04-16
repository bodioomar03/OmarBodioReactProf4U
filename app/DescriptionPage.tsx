/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useRoute, useNavigation } from "@react-navigation/native";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




function DescriptionPage() {

    const navigation = useNavigation();
    const onButtonPress = () => {
        navigation.goBack()
    };
    const route = useRoute<{ params: { id: number, name: string, company_name: string, phone: string, address: string, email: string, website: string } } & { key: string, name: string }>();
    const { id, name, company_name, phone, address, email, website } = route.params;

    const openLink = (link: string) => {
        return Linking.openURL(link).catch((e) => console.warn(e))
    }
    return (
        <SafeAreaView>
            <View style={styles.background}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.subview}>
                    <Text style={styles.subtitle}>PERSONAL INFORMATION</Text>
                    <Text style={styles.details}>address: {address}</Text>
                    <Text style={styles.details}>email: {email}</Text>
                    <TouchableOpacity onPress={() => openLink("mailto:" + email)}>
                        <View style={styles.call}>
                            <Text style={styles.textInButton}>Write an email</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.details}>phone number:  {phone}</Text>
                    <TouchableOpacity onPress={() => openLink("tel:" + phone)}>
                        <View style={styles.call}>
                            <Text style={styles.textInButton}>Call</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subview}>
                    <Text style={styles.subtitle}>PREVIOUS WORK INFORMATION</Text>
                    <Text style={styles.details}>Company name: {company_name}</Text>
                    <Text style={styles.details}>Website: {website}</Text>
                    <TouchableOpacity onPress={() => openLink("https://" + website)}>
                        <View style={styles.call}>
                            <Text style={styles.textInButton}>Go to site</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'rgba(255, 51, 0, 0.8)',
        marginHorizontal: 100,
        borderRadius: 10,
        textAlign: 'center',
        fontWeight: 'bold',

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
        textAlign: 'center',
    }
});
export default DescriptionPage;