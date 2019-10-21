<template>
  <div class="form-group px-4">
    <label>{{ name }}</label>
    <input
      class="form-control rounded-form"
      :placeholder="`Enter ${name.toLowerCase()} here...`"
      :type="type"
      @input="$emit('input', $event.target.value)"
    />
    <slot name="description"></slot>
    <span class="form-text text-muted text-error mt-2">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
    touched: {
      type: Boolean,
      required: true,
    },
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
