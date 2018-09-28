const RestaurantHelper = {
  ucfirst (string) {
    return (string.length) ? string.charAt(0).toUpperCase() + string.slice(1) : ''
  },
  
  uniqueArray (array) {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index
    })
  },
  
  formatCategories (categories) {
    return categories.map(item => RestaurantHelper.ucfirst(item)).join(' • ')
  },
  
  formatAddress (options) {
    const cityName = options.city || ''
    const streetName = options.street_name || options.streetName || ''
    const streetNumber = options.street_number || options.streetNumber || ''
    const zipCode = options.zipcode || ''
    return (options) ? `${streetName} ${streetNumber}, ${zipCode} ${cityName}` : ''
  }
}

export default RestaurantHelper
