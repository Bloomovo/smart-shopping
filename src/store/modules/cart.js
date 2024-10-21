import { getCart, setCart, delCart } from '@/api/cart.js'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isCheckedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    updataCartList (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (connext) {
      const { data } = await getCart()
      data.list.forEach(item => {
        item.isChecked = true
      })
      connext.commit('setCartList', data.list)
    },
    async changeCountAction (connext, { goodsId, goodsNum, goodsSkuId }) {
      await setCart(goodsId, goodsNum, goodsSkuId)
      connext.commit('updataCartList', { goodsId, goodsNum })
    },
    async delCartList (connext) {
      const delGoodsId = connext.getters.selCartList
      const cartIds = delGoodsId.map(item => item.id)
      await delCart(cartIds)
      Toast('删除成功')
    }
  }
}
