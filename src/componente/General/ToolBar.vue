<template>
    <div>
        <v-app-bar
            prominent
        >
            <v-toolbar color="blue-accent-2">
                <v-app-bar-nav-icon density="comfortable" class="ms-3" @click.stop="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <UserActions class="mr-5"/>
            </v-toolbar>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            width="200"
            temporary
        >
            <v-list>
                <v-list-item
                    v-for="item in items"
                    :key="item.menu_id"
                    @click="navigateTo(item)"
                >
                    <template v-slot:prepend>
                        <v-icon
                            :icon="item.icon"
                            color="blue"
                        ></v-icon>
                        <v-list-item-title class="ms-5">{{ item.title }}</v-list-item-title>
                    </template>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
 /*   import UserActions from "./UserActions.vue"
    import { mapActions, mapGetters } from "vuex"

    export default {
        name:"ToolBar",
        components: {
            UserActions
        },
        data: () => ({
            drawer: false,
            items: []
        }),

        computed: {
            ...mapGetters('auth', ['getPermissions', 'getMenus']),
        },

        mounted() {
            this.items = this.getPermissions.map((menu) => {
                return {
                    title: menu.menu,
                    icon: menu.icon,
                    menu_id: menu.menu_id,
                    route: menu.path,
                    submenus: menu.submenus
                }
            })
        },

        methods: {
            ...mapActions('location', ['located']),

            navigateTo(item) {
                this.located(item);
                this.$router.push(item.route);
                this.drawer = false;
            }
        }
    }*/
</script>
