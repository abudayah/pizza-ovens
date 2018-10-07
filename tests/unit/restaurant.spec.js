import RestaurantHelper from '@/helpers/restaurant'

describe('ucfirst', () => {
  it('Simple string', () => {
    const string = 'hello'
    const ucfirst = RestaurantHelper.ucfirst(string)

    expect(ucfirst).toBe('Hello')
  })
  
  it('Empty', () => {
    const string = ''
    const ucfirst = RestaurantHelper.ucfirst(string)

    expect(ucfirst).toBe('')
  })
})

describe('uniqueArray', () => {
  it('Numbers', () => {
    const array = [1, 2, 3, 4, 1, 2, 3, 4]
    const uniqueArray = RestaurantHelper.uniqueArray(array)
    
    expect(uniqueArray).toEqual([1, 2, 3, 4])
  })
  
  it('Mix', () => {
    const array = ['anas', 1, 2, 2, 3, 'ahmad', 1, 2, 3, 'anas']
    const uniqueArray = RestaurantHelper.uniqueArray(array)
    
    expect(uniqueArray).toEqual(['anas', 1, 2, 3, 'ahmad'])
  })
})

describe('formatCategories', () => {
  it('Array of Strings', () => {
    const categories = ['category1', 'category2', 'category3']
    const formattedCategories = RestaurantHelper.formatCategories(categories)
    
    expect(formattedCategories).toBe('Category1 • Category2 • Category3')
  })
  
  it('Empty', () => {
    const categories = []
    const formattedCategories = RestaurantHelper.formatCategories(categories)
    
    expect(formattedCategories).toBe('')
  })
})

describe('formatAddress', () => {
  it('Object', () => {
    const address = {
      city: 'Amman',
      street_name: 'Zahran',
      street_number: '34',
      zipcode: '1234'
    }
    const formattedAddress = RestaurantHelper.formatAddress(address)
    
    expect(formattedAddress).toBe('Zahran 34, 1234 Amman')
  })
  
  it('Empty', () => {
    const address = ''
    const formattedAddress = RestaurantHelper.formatAddress(address)
    
    expect(formattedAddress).toBe('')
  })
})
