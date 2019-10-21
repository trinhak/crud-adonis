<template>
  <div
    class="vh-100 bg-info d-flex flex-column justify-content-center align-items-center login-container"
  >
    <div class="mb-5 pb-3">
      <blockquote class="blockquote text-center">
        <p class="mb-0 h1 font-weight-lighter font-italic title">
          Vuejs Adonis CRUD System demo.
        </p>
        <footer class="blockquote-footer text-right">Adonis Vuejs <cite>Frameworks</cite></footer>
      </blockquote>
    </div>
    <div
      class="login-card bg-semi-transparent card px-4 pt-5 pb-4 shadow-lg w-25 rounded-0 text-left"
    >
      <ValidationObserver ref="signInValidator" v-slot="{ invalid }">
        <TextField
          name="Username or Email"
          hiddenLabel="true"
          type="text"
          rules="required"
          placeholder="Username or Email"
          v-model="signInForm.usernameOrEmail"
        />
        <div class="mt-4" />
        <TextField
          name="Password"
          hiddenLabel="true"
          type="password"
          rules="required|min:6"
          placeholder="Password"
          v-model="signInForm.password"
        />
        <button class="btn btn-block btn-outline-dark mt-4 rounded-form" @click="handleSignIn">
          <span class="font-weight-normal text-uppercase">login</span>
        </button>
      </ValidationObserver>
      <p class="muted mt-4 text-center">
        Not registered?
        <a href="#" class="text-info" data-toggle="modal" data-target="#exampleModalLong">
          Create an account
        </a>
      </p>
    </div>
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered " role="document">
        <div class="modal-content rounded-0 shadow-lg">
          <ValidationObserver ref="signUpValidator">
            <div class="modal-header">
              <h5 class="modal-title lead text-dark">Register New Account</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true" class="text-danger">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left px-4">
              <form>
                <TextField
                  name="Email"
                  type="email"
                  rules="required|email"
                  v-model="signUpForm.email"
                >
                  <small slot="description" class="text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </TextField>
                <TextField
                  name="Username"
                  type="text"
                  rules="required"
                  v-model="signUpForm.username"
                />
                <TextField
                  name="Password"
                  type="password"
                  rules="required|min:6"
                  vid="confirmation"
                  v-model="signUpForm.password"
                />
                <TextField
                  name="Confirm Password"
                  type="password"
                  rules="required|min:6|confirmed:confirmation"
                  v-model="signUpForm.confirmPassword"
                />
              </form>
            </div>
            <div class="modal-footer px-4">
              <button
                type="button"
                class="btn btn-outline-dark rounded-form btn-block my-2"
                @click="handleSignUp"
              >
                SEND
              </button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '../components/TextField';
export default {
  components: {
    TextField,
  },
  data() {
    return {
      signUpForm: {
        email: null,
        username: null,
        passwword: null,
      },
      signInForm: {
        usernameOrEmail: null,
        passwword: null,
      },
    };
  },
  methods: {
    async handleSignUp(validate) {
      const valid = await this.$refs.signUpValidator.validate();
      if (!valid) return;
      this.$store.dispatch('signUp', this.signUpForm);
    },

    async handleSignIn(validate) {
      const valid = await this.$refs.signInValidator.validate();
      if (!valid) return;
    },
  },
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(235deg, #f699ffaf, #7cd6ec);
}
.login-card {
  min-width: 350px;
}
.rounded-form {
  border-radius: calc((1.5em + 0.75rem + 2px) / 2);
}

.text-error {
  color: rgb(228, 48, 84) !important;
}
.title {
  color: rgb(48, 113, 129);
  background: linear-gradient(235deg, #008aca, #ff0aff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 10px #444444d3;
}
.icon-send {
  width: 12px;
  height: 24px;
}
.bg-semi-transparent {
  background-color: rgba(255, 255, 255, 0.9)
}
</style>
