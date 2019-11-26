<template>
  <div class="text-center">
    <div class="ma-10">
      <v-carousel cycle>
        <v-carousel-item v-for="(image, i) in iamges" :key="i">
          <v-sheet height="100%" align="center" justify="center">
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                :src="image"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="100%"
                max-height="100%"
              >
              </v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iamges: [
        'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=close-up-of-leaf-326055.jpg&fm=jpg',
        'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg',
        'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?cs=srgb&dl=trees-in-park-257360.jpg&fm=jpg',
      ],
    };
  },
};
</script>
<style>
.bg {
  background-color: "#fefbd8";
}
</style>
