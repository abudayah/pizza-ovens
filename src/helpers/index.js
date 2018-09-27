const ucfirst = (string) => {
  return (string.length) ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

const uniqueArray = (array) => {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index
  })
}

const formatAddress = (options = {
  city: '',
  street_name: '',
  street_number: '',
  zipcode: ''
}) => {
  return `${options.street_name} ${options.street_number}, ${options.zipcode} ${options.city}`
}

export default {
  ucfirst,
  uniqueArray,
  formatAddress
}
