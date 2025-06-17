<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Account</div>
      <v-text-field
        v-model='email'
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :disabled="disabled"
        :loading="loading"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>
      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        :disabled="disabled"
        :loading="loading"
      ></v-text-field>
      <v-btn
        v-model="login_btn"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="onLogin"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script>
  /*import { authService } from '../../services/authService';
  import { jwtDecode } from 'jwt-decode'*/
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data: () => ({
      visible: false,
      disabled: false, 
      loading: false,
      email:'',
      password:'',
      debounceTimeout: null,
      roles: [],
    }),

    computed: {
      ...mapGetters('auth', ['getUserData', 'getPermissions', 'getMenus']),
      isLoginDisable(){
        return this.email != '' && this.password != '';
      }
    },

    watch: {
      email(newEmail) {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        
        this.debounceTimeout = setTimeout(() => {
          if (newEmail) {
            this.getUserRoles(newEmail);
          }
        }, 500);
      },
    },

    methods: {   
      ...mapActions('auth', ['login', 'logout']),


      async onLogin() {
        try {
          this.disabled = true
          this.loading = true
          /*
          const response = await authService.loginUser({email: this.email, password: this.password});

          if (response.data) {
            const token = response.data.token
            localStorage.setItem('jwt', token);

            const decodedToken = jwtDecode(token);
            const userData = decodedToken.user_data;
            const permissions = decodedToken.permissions || [];
            const menus = decodedToken.menus || [];
            
            this.login({ userData, permissions, menus });

            }*/
         this.$router.push('/dashboard');
        } catch (error) {
          this.$emit('notify', {message:"Login Failed", ok:false, show: true});
        } finally {
          this.loading = false
          this.disabled = false
        }
      },
    }
  }
</script>