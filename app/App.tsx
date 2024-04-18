/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomePage from './HomePage.tsx';
import DescriptionPage from './DescriptionPage.tsx';
import PrefPage from './PrefPage.tsx';
import { Image, View } from 'react-native';




const Stack = createNativeStackNavigator();

function App(){

	
	return (
		
		<Stack.Navigator initialRouteName="HomePage" screenOptions={{headerShown: false,} }>
			<Stack.Screen name="HomePage" component={HomePage} />
			<Stack.Screen name="DescriptionPage" component={DescriptionPage} />
			<Stack.Screen name="PrefPage" component={PrefPage} />
	
		</Stack.Navigator>
	);
};

function Providers() {
	return (
		<NavigationContainer>
			<View style={{backgroundColor: "#DC661F"}}>
				<Image source={require('./img/Prof.png')} style={{resizeMode: 'stretch',height: 100, width: 100, alignSelf: 'center' }} />
			</View>
			<App />
		</NavigationContainer>
	);
}
export default Providers;
