<template>
  <!-- Placeholder for Rendring 1 images -->
  <b-form-group
    label="Newest rendering: Automatic description of the room & style"
    class="mt-3"
  >
    <div v-if="loading">
      <div class="text-center">
        <b-spinner />
        <p>Loading images...</p>
      </div>
    </div>
    <b-row v-else>
      <!-- Placeholder for generated images -->
      <b-col
        md="6"
        lg="3"
        v-for="(image, index) in generatedImages"
        :key="index"
      >
        <b-img
          :src="image.url"
          alt="Generated Image"
          fluid
          class="generated mb-3"
        ></b-img>
      </b-col>
    </b-row>
  </b-form-group>
</template>

<script>
import ImageGeneratorService from '@/services/ImageGeneratorService';

export default {
  name: 'RenderingComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      imageGeneratorService: new ImageGeneratorService(
        'https://picsum.photos/512/512/?image='
      ),
      generatedImages: [], // Placeholder for generated images
      loading: false, // Indicates whether the images are being loaded
    };
  },
  mounted() {
    this.get4RandomImages();
  },
  methods: {
    get4RandomImages() {
      return [
        {
          url: this.imageGeneratorService.generateImage(),
        },
        {
          url: this.imageGeneratorService.generateImage(),
        },
        {
          url: this.imageGeneratorService.generateImage(),
        },
        {
          url: this.imageGeneratorService.generateImage(),
        },
      ];
    },
  },
};
</script>

<style scoped>
/* Add styles for your image preview if necessary */
img.generated {
  border: solid 1px;
  border-radius: 8px;
  height: 240px;
  display: block;
}
</style>
