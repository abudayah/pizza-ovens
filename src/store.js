import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    cart: []
  },
  getters: {
    cartItems: state => {
      return state.cart
    },
    
    grandTotal: state => {
      let total = '0.00'
      if (state.cart.length) {
        total = state.cart.reduce((accumulator, value) => accumulator + value.total, 0)
      }
      return Number.parseFloat(total).toFixed(2)
    },
    
    cartCount: state => {
      return state.cart.length
    }
  },
  mutations: {
    addToCart (state, { id, name, price }) {
      const cartItem = state.cart.find(item => item.id === id)
      
      if (!cartItem) {
        state.cart.push({
          id,
          name,
          price,
          quantity: 1,
          total: price
        })
      } else {
        cartItem.quantity++
        cartItem.total = cartItem.quantity * price
      }
    }
  },
  actions: {
    addToCart ({ commit }, item) {
      console.log(item.id) // eslint-disable-line no-console
      commit('addToCart', {
        id: item.id,
        name: item.name,
        price: item.price
      })
    }
  }
})
