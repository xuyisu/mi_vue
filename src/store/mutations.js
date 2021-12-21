/**
 * 商城Vuex-mutations
 */
export default {
  saveUserName(state, userName) {
    state.userName = userName;
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  }
}