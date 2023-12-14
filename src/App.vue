<template>
  <div id="app" class="bg-dark text-white min-vh-100">
    <ImageUploadComponent />
    <CarouselComponent v-if="false"></CarouselComponent>
  </div>
</template>

<script>
import ImageUploadComponent from './components/ImageUploadComponent.vue';
import CarouselComponent from './components/CarousselComponent.vue';

export default {
  name: 'App',
  components: {
    ImageUploadComponent,
    CarouselComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 8px;
}
</style>
