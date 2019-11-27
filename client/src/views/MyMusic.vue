<template>
  <v-flex class="px-5 py-5">
    <v-layout justify-center>
      <v-flex>
        <span class="display-1 blue-grey--text font-weight-medium font-italic">
          My Music
        </span>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex>
        <v-card class="mx-auto" max-width="100%" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1">Add a music</v-list-item-title>
              <div>
                <v-textarea
                  name="input-7-1"
                  label="Description"
                  :value="txtDescription"
                  placeholder="Inter text..."
                  v-model="txtDescription"
                ></v-textarea>
                <div class="row">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an image"
                    prepend-icon="mdi-camera"
                    label="image"
                    @change="onFileChange"
                    v-model="path"
                    class="ml-4"
                  ></v-file-input>
                  <v-spacer></v-spacer>
                  <v-select :items="items" filled label="Filled style"></v-select>
                </div>
              </div>
              <v-img
                aspect-ratio="1"
                max-width="200"
                class="ma-3"
                :src="imageLocal"
                v-if="imageLocal"
                contain
              />
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn text color="red" :disabled="isDisable" @click="handleCancel">Cancel</v-btn>
            <v-btn text color="green" :disabled="isDisable">Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
export default {
  data() {
    return {
      txtDescription: '',
      imageLocal: null,
      path: null,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    };
  },
  computed: {
    isDisable() {
      return !(!!this.txtDescription && !!this.imageLocal);
    },
  },
  methods: {
    onFileChange(file) {
      this.createImage(file);
      this.path = file;
    },
    createImage(file) {
      if (file) {
        var reader = new FileReader();
        reader.onload = event => {
          this.imageLocal = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageLocal = null;
      }
    },
    handleCancel() {
      this.txtDescription = '';
      this.imageLocal = null;
      this.path = null;
    },
  },
};
</script>
<style>
.row {
  align-content: center;
  justify-content: center;
  flex-direction: row;
  flex: 1
}
</style>
