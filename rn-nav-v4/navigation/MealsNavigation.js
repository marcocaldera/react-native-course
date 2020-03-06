import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

import Colors from '../constants/colors'
import { Platform, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // colore del titolo
}

// la key corrisponde ai routeName da usare nell'applicazione
// ? STACK
const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoriesMeals: {
			screen: CategoriesMealsScreen,
			navigationOptions: {
				// headerTitle: 'Posso settarlo anche qua'
				// headerStyle: {
				//     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
				// },
				// headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // colore del titolo
			}
		},
		MealDetail: MealDetailScreen
	},
	{
		// navigationOptions: {} // ? queste navOptions sono utilizzate solamente nel caso in cui questo navigator si trovi innestato in un altro navigator

		// mode: 'modal', // ? in alternativa 'card' che è quello di default
		// initialRouteName: 'Categories', // ? di default è la prima route che scriviamo
		defaultNavigationOptions: defaultStackNavOptions
	}
)
// ? STACK
const FavoritesNavigator = createStackNavigator(
	{
		Favorites: {
			screen: FavoritesScreen
			// navigationOptions: {
			// 	headerTitle: 'Your Favorites'
			// }
		},
		MealDetail: MealDetailScreen
	},
	{
		defaultNavigationOptions: defaultStackNavOptions
	}
)

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			// tabBarLabel: 'Meals!',
			tabBarIcon: tabInfo => {
				return (
					<Ionicons
						name="ios-restaurant"
						size={25}
						color={tabInfo.tintColor}
					/>
				) // ? il color è quello settato nelle tabBarOptions
			},
			tabBarColor: Colors.primaryColor, // utilizzando se shifting: true (non ha effetto su ios)
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
				) : (
					'Meals'
				)
		}
	},
	Favorites: {
		screen: FavoritesNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons
						name="ios-star"
						size={25}
						color={tabInfo.tintColor}
					/>
				) // ? il color è quello settato nelle tabBarOptions
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>
						Favorites
					</Text>
				) : (
					'Favorites'
				)
		}
	}
}

// ? TAB
const MealFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true //effetto zoom

				// ? va settato se usiamo 'shifting: false' in modo da settare il background della tabbar
				// barStyle: {
				// 	backgroundColor: Colors.primaryColor
				// }
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: 'open-sans-bold'
					},
					activeTintColor: Colors.accentColor
				}
		  })

const FilterNavigator = createStackNavigator(
	{
		Filters: {
			screen: FiltersScreen
			// navigationOptions: {
			// 	headerTitle: 'Filter Meals'
			// }
		}
	},
	{
		defaultNavigationOptions: defaultStackNavOptions
	}
)
// ? DRAWER
const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals'
			}
		}, //default route
		Filters: FilterNavigator //lo uso come stack navigator chi in automatico ha un header
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: 'open-sans-bold'
			}
		}
	}
)

export default createAppContainer(MainNavigator) // entry point navigator
