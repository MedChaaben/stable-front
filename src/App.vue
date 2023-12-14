<template>
  <div id="app" class="bg-dark text-white min-vh-100">
    <ImageUploadComponent />
  </div>
</template>

<script>
import ImageUploadComponent from './components/ImageUploadComponent.vue';

export default {
  name: 'App',
  components: {
    ImageUploadComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 8px;
}
</style>
