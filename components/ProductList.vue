<template>
    <b-list-group>
        <b-list-group-item
            v-for="product in products" 
            :key="product.attributes.title" 
        >
            <nuxt-link :to="`/product/${formatSlug(product.attributes.title)}`">
                <b-row>
                    <b-col cols="4" class="th__image">
                        <img :src="`/media/${product.attributes.product_image}`" :alt="product.attributes.title">
                    </b-col>
                    <b-col cols="8" class="th__product-info">
                        <h2>{{ product.attributes.title }}</h2>
                    </b-col>
                </b-row>
            </nuxt-link>
        </b-list-group-item>
    </b-list-group>                       
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
    &__image {
        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>