<template>
    <section class="container">
        <ul class="list">
            <NuxtLink  
                class="list__item"
                v-for="product in products" 
                :key="product.attributes.title" 
                :to="`/product/${formatSlug(product.attributes.title)}`"
            >
                <li>
                    <div class="hero_image">
                        <img :src="`/media/${product.attributes.product_image}`" :alt="product.attributes.title">
                    </div>
                    <div class="productList__info">
                        <h2>{{ product.attributes.title }}</h2>
                    </div>
                </li>
            </NuxtLink>                  
        </ul>
    </section>                       
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
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &__item {
        width: 45%;
        text-decoration: none;
        list-style: none;
    }
}
</style>

/* 
TODO -- i would love to figure out how to show the md in the summary... 
right now its just plaintext not sure how to target the loader to parse this
 */