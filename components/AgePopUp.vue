<template>
    <div>
        <div class="modal" id="age" v-show="!checkCookie('over_21')">
            <b-card title="This Site is only available to people 21+">
                <div class="age__buttons">
                    <b-button variant="success" class="age__btn" @click="createCookie('over_21')">Yes</b-button>
                    <b-button variant="secondary" class="age__btn" @click="closeTab()">No</b-button>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
import { mapMutation, mapMutations } from 'vuex'

export default {
    created () {
        if (this.checkCookie('over_21')) {
            this.$store.commit('over21', true)
        }
    },
    methods: {
        createCookie(name, value, days) {
            var date, expires;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";

            this.removeId('age')
            this.$store.commit('over21', true)
        },
        checkCookie( string ) {
            let re = new RegExp(string + "=([^;]+)"),
                exec = re.exec(document.cookie),
                value = unescape(exec).split(',')
            return value[1]
        },
        removeId(id) {
            // Removes an element from the document
            let element = document.getElementById(id);
            if (element) {
                element.parentNode.removeChild(element);
                console.log('Notice app.removeElement: You have remove an element with a specific ID\n\tid = ' + id);
            } else {
                console.log('Error app.removeElement: The element you have chosen for this id does not exist\n\tid = ' + id);
            }
        },
        closeTab() {
            alert("You have to be 21+ to view this site")
        }
    },
}
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0,0,0,.4);

    .age {
        &__buttons {
            display: flex;
            justify-content: space-between;
        }
        &__btn {
            width: 49%;
        }
    }
}
</style>