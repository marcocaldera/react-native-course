export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = productId => {
	return { type: DELETE_PRODUCT, pid: productId }
}

export const createProduct = (title, description, imageUrl, price) => {
	return async dispatch => {
		const response = await fetch(
			'https://rn-test-efb40.firebaseio.com/products.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'applicatopm/json'
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price
				})
			}
		)
		//usiamo async await (alternativa ad utilizzare promise .then(res => ...)

		const resData = await response.json()
		console.log(resData)

		dispatch({
			type: CREATE_PRODUCT,
			productData: {
				id: resData.name,
				title,
				description,
				imageUrl,
				price
			}
		})
	}
}

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl
		}
	}
}
