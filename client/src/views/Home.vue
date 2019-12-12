<template>
  <div>
    <v-layout>
      <v-container fluid>
        <v-row align="center" class="justify-content-end">
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Search" filled></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="3">
            <v-select :items="items" filled label="Filled style"></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
    <v-layout>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="requestigGetPost"
        infinite-scroll-distance="500"
        class="row"
      >
        <v-flex xs12 md4 v-for="(post, index) in posts || []" :key="index">
          <v-card class="mx-auto ma-5 ml-5 mr-5">
            <v-list-item>
              <v-avatar width="50" height="50">
                <img
                  :src="post.user.profile.avatar || `https://cdn.vuetifyjs.com/images/john.jpg`"
                  alt="John"
                />
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ post.name_post }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  `by ${post.user.profile.user_name}`
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="post.image_url" height="200px"></v-img>

            <v-card-text class="txt-description">
              {{ post.description_post }}
            </v-card-text>

            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Read
              </v-btn>
              <v-btn text color="deep-purple accent-4">
                Bookmark
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="red" @click="handleFavorite(post.id)">
                <v-icon>{{
                  !!post.favorited.find(item => item.id === userInfor.id)
                    ? 'mdi-heart'
                    : 'mdi-heart-outline'
                }}</v-icon>
              </v-btn>
              <span>{{ post.__meta__.favorited_count }}</span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { get, isEqual, uniqBy } from 'lodash';

import { AuthStorage } from '../services/storage';

export default {
  data() {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      favorites: [1],
    };
  },
  mounted() {
    const currentUser = AuthStorage.getAuth();
    const params = {
      page: 1,
    };
    this.$store.dispatch('getPosts', params);
  },
  computed: {
    ...mapState({
      posts: state => get(state, 'post.post.result.posts', []) || [],
      statePosts: state => get(state, 'post.post'),
      requestigGetPost: state => get(state, 'post.post.requesting'),
    }),
    userInfor() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return AuthStorage.getAuth();
    },
    colorFavorite() {
      return this.favorites.includes(1) ? 'red' : 'white';
    },
  },
  methods: {
    loadMore() {
      if (get(this.statePosts, 'result.page') >= get(this.statePosts, 'result.lastPage')) return;
      if (this.requestigGetPost) return;
      const params = {
        page: get(this.statePosts, 'result.page', 1) + 1,
      };
      this.$store.dispatch('getPosts', params);
    },
    handleFavorite(postId) {
      const params = {
        user_id: this.userInfor.id,
        post_id: postId,
      };
      this.$store.dispatch('favorite', params);
    },
  },
};
</script>
<style>
.txt-description {
  height: 100px;
  color: darkslategrey;
  font-style: oblique;
  font-size: 1em;
}
</style>
