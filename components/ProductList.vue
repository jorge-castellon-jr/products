<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="10">
            <!-- <b-input-group prepend="Search" class="th__input-group">
                <b-form-input v-model="query" placeholder="Enter product name here ..."></b-form-input>
            </b-input-group> -->
            <b-card-group deck >
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
                        :img-src="item.attributes.product_image"
                    >
                        <nuxt-link class="th__link" :to="`/product/${formatSlug(item.attributes.title)}`"></nuxt-link>
                        <template v-slot:footer v-if="item.attributes.type">
                            <small class="text-muted">{{ item.attributes.type }}</small>
                        </template>
                    </b-card>
                </transition-group>
            </b-card-group>
        </b-col>
    </b-row>  
</b-container>            
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
            beforeEnter (el) {
                el.style.opacity = 0
                el.style.width = '100px'
                el.style.transform = 'scaleX(0) scaleY(0)'
                console.log(el.style)
            },
            enter (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity.hook(el, 'scaleX', 0)
                    Velocity.hook(el, 'scaleY', 0)
                    Velocity(
                        el,
                        { opacity: 1, scaleX: 1, scaleY: 1, width: '25%'},
                        { complete: done }
                    )
                }, delay)
            },
            leave (el, done) {
                var delay = el.dataset.index * 150
                setTimeout(function () {
                    Velocity(
                        el,
                        { width: 0, scaleX: 0, scaleY: 0, opacity: 0 },
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
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        .card {
            flex: 1 0 auto;
            transform-origin: left;
            float: left;
            max-width: calc(50% - 10px);
            margin-bottom: 40px;
            
            img {
                flex: 1 1 auto;
                object-fit: cover;
            }
            .card-title {
                margin: 0;
            }
            .card-body {
                flex: none;
            }
            .card-footer {
                padding: 3px 1.25rem;
            }

            @media only screen and (min-width: 576px) {
                max-width: calc(50% - 30px);
            }
            @media only screen and (min-width: 768px) {
                max-width: calc(25% - 30px);
            }
        }
        @media only screen and (max-width: 768px) {
            justify-content: space-between;
        }
    }
    &__image {
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