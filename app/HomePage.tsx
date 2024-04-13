import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ReactElement, JSXElementConstructor, ReactNode, Key, useState, useEffect, SetStateAction } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * Represents a card of a worker.
 */
type CardOfWorker = {
    id: number,
    name: string,
    company: {
        bs: string,
    }
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

	const onPress = () => { 
        console.log("pressed");
    }

    const [searchText, setSearchText] = useState("");
    const filteredCards = cards.filter((card) =>
        card.company.bs.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView>
            <Text style={styles.title}>Workers</Text>
            <TextInput style={styles.input}
                placeholder="Search"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            {!loading ? (
                <ScrollView>
                    {filteredCards.map((card) => (
                        <TouchableOpacity key={card.id} onPress={() => onPress()}>
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
        </SafeAreaView>
    );


}
const styles = StyleSheet.create({
	
	load: {
		
		backgroundColor: 'red',
	},
	button: {
		backgroundColor: 'green',
		paddingHorizontal: 10,
		fontSize: 24,
		paddingVertical: 20,
		borderRadius: 10,
		
	},
    phrase: {
        fontSize: 16,
        color: 'green',
        marginHorizontal: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
		marginBottom: 10,
		marginHorizontal: 10,
		textAlign: 'center',
	},
    input: {
        fontSize: 16,
        color: 'black',
        marginHorizontal: 10,
        textAlign: 'left',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        
    },

	body: {
		fontSize: 16,
		color: 'black',
		marginHorizontal: 10,
		paddingBottom: 10,
		textAlign: 'center'
	},
	card: {
		backgroundColor: 'gray',
		borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
	}
});

export default HomePage;