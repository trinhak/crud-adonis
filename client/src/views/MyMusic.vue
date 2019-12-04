<template>
  <v-flex class="px-5 py-5">
    <v-alert v-if="alertType !== ''" :type="alertType">{{ messageAlert }}!</v-alert>
    <v-layout justify-center>
      <v-flex>
        <span class="display-1 blue-grey--text font-weight-medium font-italic">
          My Music
        </span>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex>
        <v-card class="mx-auto" max-width="60%" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1">Add a music</v-list-item-title>
              <div>
                <v-text-field v-model="name" label="Post's name" required></v-text-field>
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
                    class="ml-3"
                  ></v-file-input>
                  <v-spacer></v-spacer>
                  <v-select
                    :items="categories"
                    filled
                    item-text="name"
                    item-value="id"
                    v-model="selectCategory"
                    label="Select category"
                  ></v-select>
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
            <v-btn
              text
              color="red"
              :disabled="isDisable"
              @click="handleCancel"
              :loading="requestingCreatePost"
              >Cancel</v-btn
            >
            <v-btn
              text
              color="green"
              :disabled="isDisable"
              @click="handleSave"
              :loading="requestingCreatePost"
              >Post</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="requestigGetPost"
        infinite-scroll-distance="10"
        class="row"
      >
        <v-flex v-for="(post, index) in posts" :key="index">
          <v-card class="mx-auto ma-2" max-width="400" height="400">
            <v-img class="white--text align-end" height="200px" :src="post.image_url">
              <v-card-title class="shadow" v-text="post.name_post"></v-card-title>
            </v-img>
            <v-card-subtitle class="desciption" v-text="post.description_post"></v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange" text>
                Edit
              </v-btn>

              <v-btn color="red" text>
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </v-layout>
  </v-flex>
</template>
<script>
import { mapState } from 'vuex';
import { get, isEqual } from 'lodash';

import { AuthStorage } from '../services/storage';
export default {
  data() {
    return {
      txtDescription: '',
      imageLocal: null,
      path: null,
      selectCategory: null,
      name: null,
      messageAlert: '',
      alertType: '',
      currentUser: null,
      currenUser: null,
      page: 1,
    };
  },
  mounted() {
    this.$store.dispatch('getCategories');
    const currentUser = AuthStorage.getAuth();
    const params = {
      id: currentUser.id,
      page: this.page,
    };
    this.$store.dispatch('getPostByUserId', params);
  },
  computed: {
    ...mapState({
      categories: state => get(state, 'post.categories.result', []),
      requestingCreatePost: state => get(state, 'post.createPost.requesting', false),
      requestigGetPost: state => get(state, 'post.postByUserId.requesting'),
      posts: state => get(state, 'post.postByUserId.result.posts', []),
      statePostByUser: state => get(state, 'post.postByUserId'),
      createPost: state => get(state, 'post.createPost.result'),
    }),
    isDisable() {
      return !(!!this.txtDescription && !!this.imageLocal && !!this.name && !!this.selectCategory);
    },
    userInfor() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return AuthStorage.getAuth();
    },
  },
  watch: {
    createPost(newValue, oldValue) {
      if (!isEqual(newValue, oldValue)) {
        const params = {
          id: this.userInfor.id,
          page: this.page,
        };
        this.$store.dispatch('getPostByUserId', params);
      }
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
    resetData() {
      this.txtDescription = '';
      this.imageLocal = null;
      this.path = null;
      this.name = null;
      this.selectCategory = {};
    },
    handleCancel() {
      this.resetData();
    },
    handleSave() {
      console.log('selectCategory', this.selectCategory);
      this.$store
        .dispatch('createPost', {
          name: this.name,
          description: this.txtDescription,
          image: this.path,
          userId: this.userInfor.id,
          categoryId: this.selectCategory,
        })
        .then(() => {
          const status = get(this.$store, 'state.post.createPost.status');
          this.alertType = status;
          if (status === 'success') {
            setTimeout(() => {
              this.resetData();
            }, 1000);
            this.messageAlert = 'Create success!!!';
          } else {
            this.messageAlert = `Create ${status}!.. Please! check again`;
          }
          setTimeout(() => {
            this.alertType = '';
            this.messageAlert = '';
          }, 5000);
        });
    },
    loadMore() {
      if (get(this.statePostByUser, 'result.page') >= get(this.statePostByUser, 'result.lastPage'))
        return;
      const params = {
        id: this.userInfor.id,
        page: get(this.statePostByUser, 'result.page') + 1,
      };
      if (this.requestigGetPost) return;
      this.$store.dispatch('getPostByUserId', params);
    },
  },
};
</script>
<style>
.shadow {
  text-shadow: 3px 3px 5px black !important;
}
.desciption {
  color: darkslategrey;
  font-style: oblique;
  font-size: 1em;
  height: 150px;
}
</style>
