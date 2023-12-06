<template>
    <b-container fluid>
      <!-- Upload Image Area -->
      <b-row>
        <b-col cols="12" md="4">
          <b-card title="Upload image area">
            <b-form-file v-model="file" @change="onFileChanged" button-text="Charger une image" class="mb-3" />
            <b-button @click="clearAll()">clear images</b-button>
            <!-- Image preview -->
            <div v-if="imageUrl" class="mt-3">
              <b-img :src="imageUrl" alt="Image preview" fluid />
            </div>
          </b-card>

          <!-- Select Action Area -->
          <b-card title="Select Action Area" class="my-3">
            <!-- Your action area content here -->
          </b-card>
        </b-col>


  
        <!-- Image Rendering Area -->
        <b-col cols="12" md="8" class="rendring">
          <b-card title="Image Rendering Area">
            <b-form-group label="Newest rendering: Automatic description of the room & style" class="mt-3">
              <div v-if="loading">
                <div class="text-center">
                  <b-spinner />
                  <p>Loading images...</p>
                </div>
              </div>
              <b-row v-else>
                <!-- Placeholder for generated images -->
                <b-col md="6" lg="3" v-for="(image, index) in generatedImages" :key="index">
                  <b-img :src="image.url" alt="Generated Image" fluid class="generated"></b-img>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group label="Rendring 1: Automatic description of the room & style" class="mt-3">
              <div v-if="loading">
                <div class="text-center">
                  <b-spinner />
                  <p>Loading images...</p>
                </div>
              </div>
              <b-row v-else>
                <!-- Placeholder for generated images -->
                <b-col md="6" lg="3" v-for="(image, index) in generatedImages" :key="index">
                  <b-img :src="image.url" alt="Generated Image" fluid class="generated"></b-img>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group label="Rendring 2: Automatic description of the room & style" class="mt-3">
              <div v-if="loading">
                <div class="text-center">
                  <b-spinner />
                  <p>Loading images...</p>
                </div>
              </div>
              <b-row v-else>
                <!-- Placeholder for generated images -->
                <b-col md="6" lg="3" v-for="(image, index) in generatedImages" :key="index">
                  <b-img :src="image.url" alt="Generated Image" fluid class="generated"></b-img>
                </b-col>
              </b-row>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
  
      
    </b-container>
  </template>
  
  <script>
export default {
  name: 'ImageUploadComponent',
  data() {
    return {
      file: null, // Holds the file object
      imageUrl: null, // Will hold the URL for the uploaded image
      generatedImages: [], // Placeholder for generated images
      loading: false, // Indicates whether the images are being loaded
    };
  },
  methods: {
    onFileChanged(e) {
      const file = e?.target?.files?.[0];
      this.createImage(file);
    },
    createImage(file) {
      const reader = new FileReader();
      this.loading = true;
      
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
        setTimeout(() => {
          this.generateImages();
          this.loading = false;
        }, 3000);
      };
      
      reader.readAsDataURL(file);
    },
    generateImages() {
      // Placeholder method - implement image generation logic here
      // Update generatedImages array with URLs of generated images
      console.log('render generated images')
      this.generatedImages = [
        { url: null },
        { url: null },
        { url: null },
        { url: null }
      ]
    },
    clearAll() {
      this.generatedImages = [];
      this.file = null;
      this.imageUrl = null;

    }

  }
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
  