<template>
    <b-row align-h="center">
        <b-col cols="10">
            <b-input-group prepend="Search" class="th__input-group">
                <b-form-input v-model="query" placeholder="Enter product name here ..."></b-form-input>
            </b-input-group>
            <b-card-group deck>
                <transition-group 
                    name="product-list"
                    tag="div"
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
                    class="th__card-group"
                    >
                    <b-card
                        v-for="(item, index) in computedList" 
                        :key="item.attributes.title"
                        :data-index="index"
                        :title="item.attributes.title"
                        img-top
                        :img-src="`/media${item.attributes.product_image}`" 
                    >
                        <nuxt-link class="th__link" :to="`/product/${formatSlug(item.attributes.title)}`"></nuxt-link>
                    </b-card>
                </transition-group>
            </b-card-group>
        </b-col>
    </b-row>              
</template>
<script>
    export default {
        props: {
            products: {
                type: Array,
                required: true
            }        
        },
        data () {
            return {
                query: ''
            }
        },
        computed: {
            // sortedProducts() {
            //     const sortedProducts = this.products
            //     sortedProducts.sort((a,b) => {
            //         const dateA = new Date(a.attributes.title);
            //         const dateB = new Date(b.attributes.title);
            //         if (dateA < dateB) {
            //             return 1;
            //         }
            //         if (dateA > dateB) {
            //             return -1;
            //         }
            //         return 0;
            //     })
            //     return sortedProducts
            // },
            computedList() {
                var vm = this
                return this.products.filter(function (item) {
                    return item.attributes.title.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        },
        methods: {
            formatExcerpt(body) {
                return body.slice(0 , 200).trimEnd()
            }, 
            formatSlug(title) {
                const regex = / /gi;
                return title.toLowerCase().trim().replace(regex, "-")
            },
            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                    el,
                    { opacity: 1, height: '1.6em' },
                    { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                    el,
                    { opacity: 0, height: 0 },
                    { complete: done }
                    )
                }, delay)
            }
        }
    }
</script>

<style lang="scss" scoped>
.th {
    &__input-group {
        margin-bottom: 24px;
    }
    &__card-group {
        display: flex;
        flex-flow: row wrap;
        .card {
            flex: 1 0 20%;
            margin-bottom: 40px;
        }
    }
    &__image {
        img {
            width: 100%;
            height: auto;
        }
    }
    &__product-info {
        h2 {
            font-family: corner-store-jf,sans-serif;
        }
    }
    &__link {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transition: box-shadow .3s;
        &:hover {
            box-shadow: 6px 3px 20px rgba(0, 0, 0, .24);
        }
    }
}
</style>