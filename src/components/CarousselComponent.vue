<template>
  <div>
    <b-carousel
      id="carousel-1"
      :value="selected"
      :interval="0"
      controls
      indicators
      label-next=""
      label-prev=""
      background="#ababab"
      img-width="512"
      img-height="512"
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
    selected: {
      type: Number,
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
