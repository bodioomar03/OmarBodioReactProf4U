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




const Stack = createNativeStackNavigator();

function App(){

	
	return (
		<Stack.Navigator initialRouteName="HomePage">
			<Stack.Screen name="HomePage" component={HomePage} />
	
		</Stack.Navigator>
	);
};

function Providers() {
	return (
		<NavigationContainer>
			
			<App />
		
		</NavigationContainer>
	);
}
export default Providers;
