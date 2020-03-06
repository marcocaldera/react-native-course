import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	TouchableWithoutFeedback
} from 'react-native'

const CategoryGridTile = props => {
	let Touch = TouchableOpacity

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		Touch = TouchableWithoutFeedback
	}

	return (
		<View style={styles.gridItem}>
			<Touch style={{ flex: 1 }} onPress={props.onSelect}>
				<View
					style={{
						...styles.container,
						...{ backgroundColor: props.color }
					}}>
					<Text style={styles.title}>{props.title}</Text>
				</View>
			</Touch>
		</View>
	)
}

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
		borderRadius: 10,
		elevation: 5,
		overflow:
			Platform.OS === 'android' && Platform.Versione >= 21
				? 'hidden'
				: 'visible'
	},
	container: {
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 10,
		padding: 15,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		textAlign: 'right'
	}
})

export default CategoryGridTile
