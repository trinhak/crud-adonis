<template>
  <div class="vh-100 bg-info d-flex justify-content-center align-items-center login-container">
    <div class="login-card card bg-white px-5 py-4 shadow-lg w-25">
      <input class="form-control mt-4 rounded-form" type="text" placeholder="username or email" />
      <input class="form-control mt-4 rounded-form" type="password" placeholder="password" />
      <button class="btn btn-block btn-info mt-4 rounded-form">
        <span class="text-white font-weight-normal text-uppercase ">login</span>
      </button>
      <p class="muted mt-4">
        Not registered?
        <a href="#" class="" data-toggle="modal" data-target="#exampleModalLong">
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
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <div class="modal-header">
              <h5 class="modal-title lead">Register New Account</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
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
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="handleSignUp">
                Sign Up
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
      },
    };
  },
  methods: {
    async handleSignUp(validate) {
      const valid = await this.$refs.observer.validate();
      console.log(valid);
      // this.$store.dispatch('signUp');
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
.form-control:focus {
  border: 1px #5ce0d9;
  box-shadow: 0 0 0 0.1rem #5cdbe063;
  transform: scale(1.1);
}
.text-error {
  color: rgb(228, 48, 84) !important;
}
</style>
