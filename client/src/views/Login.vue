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
          <div class="modal-header">
            <h5 class="modal-title">Register New Account</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <ValidationObserver v-slot="{ passes }">
              <form>
                <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors, touched }"
                >
                  <div class="form-group px-4">
                    <label>email</label>
                    <input v-model="form.email" class="form-control rounded-form" type="email" />
                    <span class="form-text text-muted text-error mt-2" v-if="touched">{{
                      errors[0]
                    }}</span>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="handleSignUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: null,
      },
    };
  },
  methods: {
    handleSignUp() {
      this.$store.dispatch('signUp');
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
