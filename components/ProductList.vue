<template>
    <b-row align-h="center">
        <b-col cols="10">
            <b-card-group deck class="th__card-group">
                <b-card
                    v-for="product in products" 
                    :key="product.attributes.title"
                    :title="product.attributes.title"
                    img-top
                    :img-src="`/media${product.attributes.product_image}`" 
                >
                    <nuxt-link class="th__link" :to="`/product/${formatSlug(product.attributes.title)}`"></nuxt-link>
                </b-card>
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
        computed: {
            sortedproducts() {
                const sortedproducts = this.products
                sortedproducts.sort((a,b) => {
                    const dateA = new Date(a.attributes.title);
                    const dateB = new Date(b.attributes.title);
                    if (dateA < dateB) {
                        return 1;
                    }
                    if (dateA > dateB) {
                        return -1;
                    }
                    return 0;
                })
                return sortedproducts
            }
        },
        methods: {
            formatExcerpt(body) {
                return body.slice(0 , 200).trimEnd()
            }, 
            formatSlug(title) {
                const regex = / /gi;
                return title.toLowerCase().trim().replace(regex, "-")
            }
        }
    }
</script>

<style lang="scss" scoped>
.th {
    &__card-group .card {
        flex: 1 0 20%;
        margin-bottom: 40px;
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