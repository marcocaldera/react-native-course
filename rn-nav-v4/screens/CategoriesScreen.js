import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
	Platform
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

import { CATEGORIES } from '../data/dammy-data'
import Colors from '../constants/colors'
import CategoryGridTile from '../components/CategoryGridTile'

// ? Non usato più
const OLDCatScreen = props => {
	// Per vedere le props del navigation
	console.log(props)

	return (
		<View style={styles.screen}>
			<Text>The Categories Screen!</Text>
			<Button
				title="Go to Meals"
				onPress={() => {
					// ! props.navigation.navigate({ routeName: 'CategoriesMeals' })
					props.navigation.navigate('CategoriesMeals')

					// push è utile per pushare una nuova screen (o cmq qualcosa che si vuole ricaricare)
					// con navigate invece se uno Screen già esiste viene semplicemente riportato in cima
					// ! props.navigation.push('Categories')

					// con replace diventa la nuova root e non posso tornare indietro
					// utile nelle schermate di login dove poi non voglio che l'utente possa tornare indietro
					// ! props.navigation.replace('CategoriesMeals')
				}}
			/>
		</View>
	)
}

const CategoriesScreen = props => {
	const renderGridItem = itemData => {
		return (
			<CategoryGridTile
				color={itemData.item.color}
				title={itemData.item.title}
				onSelect={() =>
					props.navigation.navigate({
						routeName: 'CategoriesMeals',
						params: {
							categoryId: itemData.item.id
						}
					})
				}
			/>
		)
	}

	return (
		// Non serve il key-extractor perchè le mie categories hanno già un id (che react riconsce in automatico come key)
		<FlatList
			data={CATEGORIES}
			renderItem={renderGridItem}
			numColumns={2}
		/>
	)
}

// * Navigation options
CategoriesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Meal Cate',
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
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CategoriesScreen
