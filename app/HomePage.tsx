import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ReactElement, JSXElementConstructor, ReactNode, Key, useState, useEffect, SetStateAction } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * Represents a card of a worker.
 */
type CardOfWorker = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};


function HomePage() {
	const [loading, setLoading] = useState(false);
	const [cards, setCard] = useState<CardOfWorker[]>([]);
	const navigation = useNavigation();
    const bs: string[] = Array.from(new Set(cards.flatMap(card => card.company.bs.split(" "))));
    
    const loadData = async () => {
        setLoading(true);
        axios
            .get<CardOfWorker[]>('https://jsonplaceholder.typicode.com/users')
            .then(response => setCard(response.data))
            .catch((error) => console.error("An error occured" + error))
            .finally(() => setLoading(false));
        
    }
	useEffect(() => {
		//chiamata api
		if(loading) return;

		loadData();

	},[]);

	const onPress = (id: number, name: string, company_name: string, phone: string, address: string, email: string, website: string) => {
		(navigation as any).navigate("DescriptionPage", ({id: id, name: name, company_name: company_name, phone: phone, address: address, email: email, website: website}));
	}

    const [searchText, setSearchText] = useState("");
    const filteredCards = cards.filter((card) =>
        card.company.bs.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView>
            <View style={styles.background}>
            <Text style={styles.name}>Prof4U</Text>
            <TextInput style={styles.input}
                placeholder="Search"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            {!loading ? (
                <ScrollView>
                    {filteredCards.map((card) => (
                        <TouchableOpacity key={card.id} onPress={() => onPress(card.id, card.name, card.company.name, card.phone.split(" ")[0], card.address.street, card.email, card.website)}>
                            <View style={styles.card}>
                                <Text style={styles.title}>{card.name}</Text>

                                {card.company.bs.split(" ").map((job, index) => (
                                    <View key={index} style={styles.card}>
                                        <Text style={styles.phrase} key={index}>{job}</Text>
                                    </View>
                                ))}

                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.load}>
                    <ActivityIndicator size={"large"} color={'blue'} />
                </View>
            )}
            </View>
        </SafeAreaView>
    );


}
const styles = StyleSheet.create({
    name: {
        fontSize: 36,
        color: 'rgba(255, 70, 0, 1)',
        marginHorizontal: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    background: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)',
    },
    load: {
        backgroundColor: 'rgba(255, 102, 0, 0.8)',
    },
    button: {
        backgroundColor: 'rgba(255, 51, 0, 0.8)',
        paddingHorizontal: 10,
        fontSize: 24,
        paddingVertical: 20,
        borderRadius: 10,
    },
    phrase: {
        fontSize: 16,
        color: 'rgba(255, 153, 0, 1)',
        marginHorizontal: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgba(255, 153, 0, 1)',
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    input: {
        fontSize: 16,
        color: 'rgba(255, 153, 0, 1)',
        marginHorizontal: 10,
        textAlign: 'left',
        backgroundColor: 'rgba(255, 204, 0, 0.2)',
        borderColor: 'rgba(255, 153, 0, 1)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        color: 'rgba(255, 153, 0, 1)',
        marginHorizontal: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    card: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)',
        borderColor: 'rgba(255, 153, 0, 1)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    }
});

export default HomePage;