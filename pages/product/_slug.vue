// this is a dynamically created template

<template>
  <article class="product container">
      <figure class="product__hero">
          <img :src="`/media/${product.attributes.product_image}`" :alt="product.attributes.title">
      </figure>
    <div class="product__info" >
      <h1>{{ product.attributes.title }}</h1>
    </div>
    <div class="product__body" v-html="product.html"></div>
    <div class="product__footer">
      <NuxtLink :to="`/product/${prevProductPath}`" class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26"  transform="scale(-1,1)">
          <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713  C23.411,13.317,23.411,12.685,23.021,12.294z"/>
        </svg>
      </NuxtLink>
      <NuxtLink :to="`/product/${nextProductPath}`" class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26">
          <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713  C23.411,13.317,23.411,12.685,23.021,12.294z"/>
        </svg>
      </NuxtLink>
    </div>
  </article>
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
.product__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.arrow {
    width: 100px;
}
</style>