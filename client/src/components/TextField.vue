<template>
  <ValidationProvider :vid="vid" :name="name" :rules="rules"  v-slot="{ errors, touched }">
    <div class="form-group px-4">
      <label>{{ name }}</label>
      <input
        class="form-control rounded-form"
        :placeholder="`Enter ${name.toLowerCase()} here...`"
        :type="$attrs.type"
        v-model="innerValue"
      />
      <slot name="description"></slot>
      <span class="form-text text-muted text-error mt-2" v-if="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    vid: {
      type: String,
    },
    value: {
      type: null,
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    innerValue: '',
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style scoped>
.rounded-form {
  border-radius: calc((1.5em + 0.75rem + 2px) / 2);
}
.rounded-form:focus {
  border: 1px #5ce0d9;
  box-shadow: 0 0 0 0.1rem #5cdbe063;
  transform: scale(1.1);
}
.text-error {
  color: rgb(228, 48, 84) !important;
}
</style>
