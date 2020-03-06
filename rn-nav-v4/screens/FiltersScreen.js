import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }} //si può anche settare quando false
				thumbColor={Platform.OS === 'android' && Colors.primaryColor}
				value={props.state}
				onValueChange={props.onChange}
			/>
		</View>
	)
}

const FiltersScreen = props => {
	const [isGlutenFree, setIsGlutenFree] = useState(false)
	const [isLactoseFree, setIsLactoseFree] = useState(false)
	const [isVegan, setIsVegan] = useState(false)
	const [isVegetarian, setIsVegetarian] = useState(false)

	const dispatch = useDispatch()

	// https://dev.to/devcord/react-hooks-useeffect-usecallback-usememo-3o42
	// saveFilters viene ricreata solamente quando cambia uno dei 4 valori
	// ! in questo modo viene garantito che useEffect (sotto) venga richiamato solo quando effettivamente cambiano i valori
	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian
		}

		dispatch(setFilters(appliedFilters))
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

	// eseguito ad ogni re-render e quindi ad ogni modifica dello state
	// in pratica ad ogni modifica dello stete vogliamo passare i filtri aggiornati
	// in modo che possano essere letti dalle navigation options
	const { navigation } = props // ? destructuring
	useEffect(() => {
		navigation.setParams({ save: saveFilters })
	}, [saveFilters])

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters</Text>
			<FilterSwitch
				label={'Gluten-free'}
				state={isGlutenFree}
				onChange={newValue => setIsGlutenFree(newValue)}
			/>
			<FilterSwitch
				label={'Lactose-free'}
				state={isLactoseFree}
				onChange={newValue => setIsLactoseFree(newValue)}
			/>
			<FilterSwitch
				label={'Vegan'}
				state={isVegan}
				onChange={newValue => setIsVegan(newValue)}
			/>
			<FilterSwitch
				label={'Vegetarian'}
				state={isVegetarian}
				onChange={newValue => setIsVegetarian(newValue)}
			/>
		</View>
	)
}

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filters Meals',
		// occhio alle 'S' buttons...
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-save"
					onPress={() => navData.navigation.getParam('save')()}
				/>
			</HeaderButtons>
		)

		// headerStyle: {
		//     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		// },
		// headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // colore del titolo
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 15
	}
})

export default FiltersScreen
