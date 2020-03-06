import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { CATEGORIES } from '../data/dammy-data'
import Colors from '../constants/colors'
import MealList from '../components/MealList'
import Meal from '../models/meal'
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText'

// ? Non usato più
const OLDCategoryMealScreen = props => {
	const catId = props.navigation.getParam('categoryId')
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

	return (
		<View style={styles.screen}>
			<Text>The Category Meal Screen!</Text>
			<Text>{selectedCategory.title}</Text>
			<Button
				title="Go to Meal detail"
				onPress={() => {
					// props.navigation.navigate({ routeName: 'CategoriesMeals' })
					props.navigation.navigate('MealDetail')
				}}
			/>
			<Button
				title="Go Back"
				onPress={() => {
					props.navigation.goBack()
					// props.navigation.pop() // identico a goBack per lo stack navigator
				}}
			/>
		</View>
	)
}

const CategoryMealScreen = props => {
	const catId = props.navigation.getParam('categoryId')

	const availableMeals = useSelector(state => state.meals.filteredMeals)

	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
	)

	if (displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meal found, check your filter</DefaultText>
			</View>
		)
	}

	// ! navigation è presente sono nelle componenti che sono richiamate direttamente dal nav quindi dobbiamo passare le props
	return <MealList listData={displayedMeals} navigation={props.navigation} />
}

// * Navigation options (dynamic)
CategoryMealScreen.navigationOptions = navigationData => {
	// console.log(navigationData)

	const catId = navigationData.navigation.getParam('categoryId')
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

	return {
		headerTitle: selectedCategory.title
		// headerStyle: {
		//     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		// },
		// headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // colore del titolo
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CategoryMealScreen
