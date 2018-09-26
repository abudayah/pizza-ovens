const ucfirst = (string) => {
  return (string.length) ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

const uniqueArray = (array) => {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index
  })
}

export default {
  ucfirst,
  uniqueArray
}
