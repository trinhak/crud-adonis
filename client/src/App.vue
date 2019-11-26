<template>
  <v-app id="app">
    <div v-if="$route.path === '/'">
      <v-alert v-if="alertType !== ''" :type="alertType">{{ messageAlert }}!</v-alert>
      <v-toolbar color="#BBDEFB">
        <v-toolbar-title class="wellcom">Wellcome</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="isDialogLogin = true" class="title-text" color="#800000">
            Login
          </v-btn>
          <v-btn text @click="isDialogSignup = true" class="title-text" color="#800000"
            >SignUp</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <router-view />
    </div>
    <div v-else>
      <v-toolbar color="#BBDEFB" class="justify-center">
        <v-toolbar-title class="wellcom">Wellcome to the world of music</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="logout" class="title-text" color="#800000">
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer color="side-bar" app class="routes-container">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in drawerItems" :key="item.name" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </div>
    <div class="text-center">
      <!-- dialog for login -->
      <v-dialog v-model="isDialogLogin" width="500">
        <v-card>
          <v-card-title class="headline teal lighten-4 title-text" primary-title>
            Login
          </v-card-title>

          <v-form v-model="valid">
            <v-container>
              <v-text-field
                v-model="emailLogin"
                :rules="emailRules"
                label="E-mail"
                required
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="passwordLogin"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="isDialogLogin = false"
              :disabled="requestingLogin"
              :loading="requestingLogin"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green"
              text
              @click="login"
              :disabled="requestingLogin"
              :loading="requestingLogin"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- dialog for sigin -->

      <v-dialog v-model="isDialogSignup" width="500">
        <v-card>
          <v-card-title class="headline teal lighten-4 title-text" primary-title>
            SignUp
          </v-card-title>
          <v-form v-model="valid">
            <v-container>
              <v-text-field v-model="name" label="Name" required></v-text-field>

              <v-text-field
                v-model="emailSignup"
                :rules="emailRules"
                label="E-mail"
                required
                type="email"
              ></v-text-field>

              <v-text-field
                v-model="passwordSignup"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </v-container>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="isDialogSignup = false"
              :disabled="requestingSignup"
              :loading="requestingSignup"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green"
              text
              @click="signUp"
              :disabled="requestingSignup"
              :loading="requestingSignup"
            >
              Signin
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- <v-footer absolute class="font-weight-medium pa-0 grey lighten-3">
      <v-layout class="flex-column">
        <v-flex>
          <div class="pa-1 border-bottom bord">
            <v-icon size="22" color="darken-2">mdi-facebook-box</v-icon>
            <v-icon size="22" color="darken-2">mdi-twitter-circle</v-icon>
          </div>
        </v-flex>
        <v-flex>
          <div>1.0.0 — <strong>My Web</strong></div>
        </v-flex>
      </v-layout>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { get, isEqual, cloneDeep } from 'lodash';

import { AuthStorage } from './services/storage';

export default {
  data() {
    return {
      valid: false,
      isDialogLogin: false,
      isDialogSignup: false,
      emailLogin: '',
      emailSignup: '',
      passwordSignup: '',
      passwordLogin: '',
      name: '',
      alertType: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      icons: ['mdi-facebook-box', 'mdi-fa-twitter'],
      messageAlert: '',
      drawerItems: [
        {
          name: 'Home',
          icon: 'mdi-home',
          path: '/home',
        },
        {
          name: 'Favorites',
          icon: 'mdi-heart',
          path: '/favorite',
        },
        {
          name: 'Profile',
          icon: 'mdi-account',
          path: '/profile',
        },
        {
          name: 'My Music',
          icon: 'mdi-playlist-music',
          path: '/my-music',
        },
      ],
      isDrawer: false,
    };
  },
  computed: {
    ...mapState({
      requestingSignup: state => get(state, 'user.signUp.requesting', false),
      requestingLogin: state => get(state, 'user.signUp.requesting', false),
      status: state => get(state, 'user.signUp.status'),
    }),
  },
  methods: {
    signUp() {
      const params = {
        username: this.name,
        email: this.emailSignup,
        password: this.passwordSignup,
      };
      this.$store.dispatch('signUp', params).then(() => {
        this.isDialogSignup = false;
        this.alertType = get(this.$store, 'state.user.signUp.status');
        this.messageAlert = `Signup ${this.alertType}`;
        setTimeout(() => {
          this.alertType = '';
          this.messageAlert = '';
        }, 5000);
      });
    },
    login() {
      const params = {
        email: this.emailLogin,
        password: this.passwordLogin,
      };
      this.$store.dispatch('login', params).then(() => {
        const status = get(this.$store, 'state.user.login.status');
        if (status === 'success') {
          this.emailLogin = '';
          this.passwordLogin = '';
          this.isDialogLogin = false;
          this.$router.push({
            path: '/home',
          });
        }
      });
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fbe9e7;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.title-text {
  color: maroon;
  text-align: center;
  font-style: oblique;
}
.wellcom {
  font-style: oblique;
  font-size: 2em;
  color: maroon;
}
.routes-container {
  height: 100%;
  background: linear-gradient(-30deg, #006064, #bbdefb) !important;
}
</style>
