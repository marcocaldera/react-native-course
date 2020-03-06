import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

import MealsNavigation from './navigation/MealsNavigation'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import mealsReducer from './store/reducers/meals'

const rootReducer = combineReducers({
	meals: mealsReducer
})
const store = createStore(rootReducer)

// ! in questo modo usiamo i componenti nativi di ios ed android per renderizzare le pagine (più efficienza)
enableScreens()

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	})
}

export default function App() {
	const [dataLoaded, setDataLoaded] = useState(false)

	if (!dataLoaded) {
		// AppLoading serve per bloccare il render dell'App fino a quando fetchFonts (che restituisce una promise) non ha
		// finito di eseguire. Quando ha finito viene chiamato onFinish
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		)
	}

	return (
		<Provider store={store}>
			<MealsNavigation />
		</Provider>
	)
}

const styles = StyleSheet.create({})
