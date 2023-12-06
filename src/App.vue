<template>
  <div id="app">
    <ImageUploadComponent />
    <CarouselComponent v-if="false"></CarouselComponent>
  </div>
</template>

<script>
// import PageForm from './components/PageForm.vue';
import ImageUploadComponent from './components/ImageUploadComponent.vue';
import CarouselComponent from './components/CarousselComponent.vue';

export default {
  name: 'App',
  components: {
    //PageForm,
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
  margin-top: 60px;
}
</style>
