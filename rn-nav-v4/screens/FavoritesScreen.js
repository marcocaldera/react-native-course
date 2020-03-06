import React from 'react'
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import DefaultText from '../components/DefaultText'

const FavoritesScreen = props => {
	// const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

	const favMeals = useSelector(state => state.meals.favoriteMeals)

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.noFav}>
				<DefaultText>
					No favorite Meals Found. Start adding some!
				</DefaultText>
			</View>
		)
	}

	return <MealList listData={favMeals} navigation={props.navigation} />
}

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Favorites',
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
		)
		// headerStyle: {
		//     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		// },
		// headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // colore del titolo
	}
}

const styles = StyleSheet.create({
	noFav: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default FavoritesScreen
