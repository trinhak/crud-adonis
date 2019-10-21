<template>
  <ValidationProvider
    :vid="vid"
    :name="name"
    :rules="rules"
    v-slot="{ errors, touched, changed, validated }"
  >
    <div class="form-group">
      <label class="text-secondary" v-if="!hiddenLabel">{{ name }}</label>
      <input
        class="form-control rounded-form"
        :placeholder="$attrs.placeholder || `Enter ${name.toLowerCase()} here...`"
        :type="$attrs.type"
        v-model="innerValue"
      />
      <slot name="description"></slot>
      <span class="form-text text-danger small" v-if="touched || (!changed && validated)">
        {{ errors[0] }}
      </span>
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
    hiddenLabel: {
      type: Boolean,
      default: false,
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
  background-color: transparent !important;
}
.rounded-form:focus {
  border: 1px #424242;
  box-shadow: 0 0 0 0.1rem #42424263;
  transform: scale(1.05);
  background-color: transparent !important;
}
</style>
