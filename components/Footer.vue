<template>
    <b-row align-h="center" class="th__footer" :style="`---PrimaryColor: ${home.primary_color}`">
        <b-col>
            <p><a href="https://thoriumdesign.com">Design and Developed By Thorium Design, LLC</a></p>
        </b-col>
        <b-col v-if="company.license">
            <p>Licence # {{ company.license }}</p>
        </b-col>
    </b-row>
</template>

<script>
import companyJSON from "~/content/data/company.json";
import homeJSON from "~/content/data/home.json";

export default {
    data () {
        return {
            company: companyJSON,
            home: homeJSON,
        }
    }
}
</script>

<style lang="scss" scoped>
.th {
    &__footer {
        background: var(--PrimaryColor);
        margin-top: 150px;
        padding-top: 80px;
        padding-bottom: 100px;

        p,a {
            color: white;
            text-align: center;
        }
    }
}
</style>