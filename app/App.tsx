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




const Stack = createNativeStackNavigator();

function App(){

	
	return (
		<Stack.Navigator initialRouteName="HomePage">
			<Stack.Screen name="HomePage" component={HomePage} />
			<Stack.Screen name="DescriptionPage" component={DescriptionPage} />
	
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
