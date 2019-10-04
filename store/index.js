export const state = () => ({
    productsShow: false
})
export const mutations = {
    over21 ( vuexContext, bool ) {
       vuexContext.productsShow = bool
    },
}