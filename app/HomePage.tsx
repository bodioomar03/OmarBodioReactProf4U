import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {useState, useEffect} from "react";
import { ActivityIndicator,SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Geolocation from '@react-native-community/geolocation';

//Rapprenetazione di un lavoratore
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
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [cards, setCard] = useState<CardOfWorker[]>([]);
    const [order, setOrder] = useState<boolean>(false);
    const toggleSwitch = () => setOrder(previousState => !previousState);
    const navigation = useNavigation();
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [preferences, setPreferences] = useState<string[]>([]);
    

    //restituisce la posizione attuale utilizzando una libreria esterna
    Geolocation.getCurrentPosition(info => {
        setLatitude(info.coords.latitude);
        setLongitude(info.coords.longitude);
    });

    //carica i dati da un server esterno
    const loadData = async () => {
        setLoading(true);
        axios
            .get<CardOfWorker[]>('https://jsonplaceholder.typicode.com/users')
            .then(response => setCard(response.data))
            .catch((error) => console.error("An error occured" + error))
            .finally(() => setLoading(false));

    }
    //carica i dati all'avvio dell'app
    useEffect(() => {

        if (loading) return;

        loadData();

    }, []);

    //funzione che permette di passare alla pagina di descrizione e che passa tutti i parametri necessari
    const onPress = (id: number, name: string, company_name: string, phone: string, address: string, email: string, website: string) => {
        (navigation as any).navigate("DescriptionPage", ({ id: id, name: name, company_name: company_name, phone: phone, address: address, email: email, website: website }));
    }

    //funzione che permette di passare alla pagina delle preferenze e che passa tutti i parametri necessari
    const onPrefPress = (preferences: string[]) => {
        (navigation as any).navigate("PrefPage", (preferences));
    }

    //funzione che calcola la distanza tra due punti dati i loro latitudine e longitudine, considerando la terra come una sfera
    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        var R = 6371;
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    //filtro per la ricerca, non tiene conto delle maiuscole e delle minuscole e che la stringa inserita sia inizio della stringa relativa alla mansione
    const filteredCards = cards.filter((card) =>
        card.company.bs.toLowerCase().includes(searchText.toLowerCase())
    );

    //ordina le card in base alla distanza
    const orderCards = order ? filteredCards.sort((a) => distance(Number(a.address.geo.lat), Number(a.address.geo.lng), latitude, longitude)) : filteredCards;


    return (
        <SafeAreaView>

            <View style={styles.background}>
                <Text style={styles.name}>Prof4U: Where Companies Meet Competence!</Text>
                <TextInput style={styles.input}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Text style={styles.body}>Order by distance from your location:
                    <Switch
                        trackColor={{ false: '#767577', true: 'orange' }}
                        thumbColor={order ? 'red' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={order}

                    />
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => onPrefPress(preferences)}>

                    <Text style={styles.textInButton}>Preferences ({preferences.length})</Text>
                    <TouchableOpacity style={styles.redbutton} onPress={() => setPreferences([])}>
                        <Text style={styles.textInButton}>DELETE ALL PREFERENCES</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {!loading ? (
                    <ScrollView style={{ marginBottom: 500 }}>
                        {orderCards.map((card) => (
                            <TouchableOpacity key={card.id} onPress={() => onPress(card.id, card.name.toUpperCase(), card.company.name, card.phone.split(" ")[0], card.address.street + ", " + card.address.suite + ", " + card.address.city, card.email, card.website)}>
                                <View style={styles.card}>
                                    <View style={styles.viewInCard}>
                                        <Text style={styles.title}>{card.name}</Text>
                                        <TouchableOpacity onPress={() => !preferences.includes(card.name) ? setPreferences([...preferences, card.name]) : console.log("gia presente")}>
                                            <View style={styles.buttonPref}>
                                                <Text style={styles.textInButtonPref}>Add to</Text>
                                                <Text style={styles.textInButtonPref}>preferences</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

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
                    <ActivityIndicator size={"large"} color={'rgba(255,70,0,1)'} />
                </View>
                )}

            </View>

        </SafeAreaView>
    );


}
const styles = StyleSheet.create({

    name: {
        fontSize: 20,
        color: "#DC661F",
        marginHorizontal: 10,
        marginBottom: 1,
        marginTop: 10,
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
        backgroundColor: "#DC661F",
        fontSize: 24,
        margin: 5,
        borderRadius: 10,
    },
    redbutton: {
        backgroundColor: "red",
        borderBlockColor: 'white',
        borderWidth: 1,
        fontSize: 24,
        margin: 5,
        borderRadius: 10,
    },
    buttonPref: {
        backgroundColor: "#DC661F",
        fontSize: 24,
        margin: 5,
        borderRadius: 10,
        padding: 5,
        alignSelf: 'flex-end'
    },
    viewInCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    phrase: {
        fontSize: 16,
        color: "#DC661F",
        marginHorizontal: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    textInButton: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    textInButtonPref: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#DC661F",
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    input: {
        fontSize: 16,
        color: 'rgba(255, 153, 0, 1)',
        marginHorizontal: 10,
        textAlign: 'left',
        backgroundColor: 'rgba(255, 153, 0, 0.2)',
        borderColor: "#DC661F",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    },
    body: {
        fontSize: 16,
        color: "#DC661F",
        marginHorizontal: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    card: {
        backgroundColor: 'rgba(255, 153, 0, 0.2)',
        borderColor: "#DC661F",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
    }
});

export default HomePage;


