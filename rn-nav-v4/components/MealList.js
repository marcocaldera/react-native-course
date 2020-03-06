import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import MealItem from '../components/MealItem'

const MealList = props => {
	const renderMealItem = itemData => {
		return (
			<MealItem
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				imageUrl={itemData.item.imageUrl}
				title={itemData.item.title}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title
						}
					})
				}}
			/>
		)
	}

	return (
		<View style={styles.list}>
			<FlatList
				data={props.listData}
				keyExtractor={(item, index) => item.id} // automatico nelle nuove versione di react
				renderItem={renderMealItem}
				style={{ width: '100%' }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	}
})

export default MealList
