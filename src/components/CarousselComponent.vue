<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      label-next=""
      label-prev=""
      background="#ababab"
      img-width="512"
      img-height="512"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with image only -->
      <b-carousel-slide v-for="(image, index) in images" :key="index">
        <template #img>
          <img
            :src="`data:image/png;base64,${image}`"
            class="d-block w-100"
            alt="Slide"
          />
        </template>

        <!-- Bouton de téléchargement -->
        <a
          :href="`data:image/png;base64,${image}`"
          :download="`image-${index}.png`"
          class="download-button"
        >
          Télécharger
        </a>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      console.log('onSlideStart', slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log('onSlideEnd', slide);
      this.sliding = false;
    },
  },
};
</script>

<style scoped lang="css">
li {
  position: relative;
  width: 24px;
  color: white;
}

ol {
  background: rgba(0, 0, 0, 0.5);
}
</style>
