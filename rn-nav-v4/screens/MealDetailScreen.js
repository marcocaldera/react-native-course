import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { Header } from 'react-native/Libraries/NewAppScreen'
import DefaultText from '../components/DefaultText'
import { useSelector, useDispatch } from 'react-redux'
import { toogleFavorite } from '../store/actions/meals'

const OLDMealDetailScreen = props => {
	const mealId = props.navigation.getParam('mealId')

	const selectedMeal = MEALS.find(meal => meal.id === mealId)

	return (
		<View style={styles.screen}>
			<Text>{selectedMeal.title}</Text>
			<Button
				title="Go Back to Categories"
				onPress={() => props.navigation.popToTop()} // per tornare alla root della navigation
			/>
		</View>
	)
}

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	)
}

const MealDetailScreen = props => {
	const availableMeals = useSelector(state => state.meals.meals)
	const mealId = props.navigation.getParam('mealId')
	const checkCurrentMealIsFavorite = useSelector(state =>
		state.meals.favoriteMeals.some(meal => meal.id === mealId)
	)

	const selectedMeal = availableMeals.find(meal => meal.id === mealId)

	const dispatch = useDispatch()
	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toogleFavorite(mealId))
	}, [dispatch, mealId])

	useEffect(() => {
		props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
	}, [toggleFavoriteHandler])

	useEffect(() => {
		props.navigation.setParams({ isFav: checkCurrentMealIsFavorite })
	}, [checkCurrentMealIsFavorite])

	return (
		<ScrollView>
			<Image
				source={{ uri: selectedMeal.imageUrl }}
				style={styles.image}
			/>
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>
					{selectedMeal.complexity.toUpperCase()}
				</DefaultText>
				<DefaultText>
					{selectedMeal.affordability.toUpperCase()}
				</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map(ingredient => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	)
}

MealDetailScreen.navigationOptions = navigationData => {
	// const mealId = navigationData.navigation.getParam('mealId')
	const mealTitle = navigationData.navigation.getParam('mealTitle')
	// const selectedMeal = MEALS.find(meal => meal.id === mealId)
	const toggleFavorite = navigationData.navigation.getParam('toggleFav')
	const isFav = navigationData.navigation.getParam('isFav')
	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={isFav ? 'ios-star' : 'ios-star-outline'}
					onPress={toggleFavorite}
				/>
				{/* <Item
					title="Favorite2" //usato come key
					iconName="ios-star-outline"
					onPress={() => {
						console.log('test')
					}}
				/> */}
			</HeaderButtons>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
})

export default MealDetailScreen
