// this is a dynamically created template

<template>
    <b-container class="th__product">
        <b-row align-v="center">
            <b-col cols="6">
                <b-img-lazy fluid-grow :src="`/media${product.attributes.product_image}`" :alt="product.attributes.title"></b-img-lazy>
            </b-col>
            <b-col cols="6">
                <h1>{{ product.attributes.title }}</h1>
                <b-row v-if="product.attributes.prices">
                    <b-col v-for="price in product.attributes.prices" :key="price">
                        <h4><strong>${{ price.price }}</strong> ({{ price.unit }})</h4>
                    </b-col>
                </b-row>
                <div class="th__product-body" v-html="product.html"></div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    export default {
        layout: "layout",
        computed: {
            nextProductPath() {
                const firstproductPath = this.sortedPaths[0]
                // if there's no 'next' path, return the first path
                const nextPath = isNull(this.sortedPaths[this.sortedPaths.indexOf(this.currentPath) + 1]) ? firstproductPath : this.sortedPaths[this.sortedPaths.indexOf(this.currentPath) + 1]
                function isNull(item) {
                    return item === null || item === undefined
                }
                return nextPath
            },
            prevProductPath() {
                const lastproductPath = this.sortedPaths[this.sortedPaths.length -1]
                // if there's no 'next' path, return the first path
                const nextPath = isNull(this.sortedPaths[this.sortedPaths.indexOf(this.currentPath) - 1]) ? lastproductPath : this.sortedPaths[this.sortedPaths.indexOf(this.currentPath) - 1]
                function isNull(item) {
                    return item === null || item === undefined
                }
                return nextPath
            } 
        },
        // get the slug as a param to import the correct md file
        async asyncData({ params }) {
            try {
                const currentPath = params.slug
                // get current product data
                const product = await import(`~/content/products/${params.slug}.md`);
                // get all product data for next route
                const allproducts = await require.context("~/content/products/", true, /\.md$/)
                const products =  allproducts.keys().map((key) => {
                return allproducts(key)
                });

                const sortedproducts = products.sort((a,b) => {
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

                const sortedPaths = [] 
                sortedproducts.map(product => {
                // clean up the path - split by /
                let relPath = product.attributes._meta.resourcePath.split('/')
                // get the end of the path, remove '.md'
                relPath = relPath[relPath.length - 1].slice(0, -3)
                sortedPaths.push(relPath)
                })
                return {
                    sortedPaths,
                    product,
                    currentPath
                }
            } catch(err) {
                console.debug(err)
                return false
            }
        }, 
    }
</script>

<style lang="scss" scoped>
.th {
    &__product {
        padding-top: 24px;
        margin-bottom: 24px;

        &-body {

        }
    }
}
</style>