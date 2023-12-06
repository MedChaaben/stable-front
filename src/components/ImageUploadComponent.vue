<template>
  <b-container fluid>
    <!-- Upload Image Area -->
    <b-row>
      <b-col cols="12" md="4">
        <b-card title="Upload image area">
          <b-form-file
            v-model="file"
            @change="onFileChanged"
            button-text="Charger une image"
            class="mb-3"
          />
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

          <!-- Placeholder for Rendring 1 images -->
          <b-form-group
            label="Rendring 1: Automatic description of the room & style"
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
                v-for="(image, index) in generatedImages1"
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

          <!-- Placeholder for Rendring 2 images -->
          <b-form-group
            label="Rendring 2: Automatic description of the room & style"
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
                v-for="(image, index) in generatedImages2"
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
      generatedImages1: [], // Placeholder for generated images
      generatedImages2: [], // Placeholder for generated images
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
      console.log('render generated images');
      this.generatedImages = this.get4RandomImages();
      this.generatedImages1 = this.get4RandomImages();
      this.generatedImages2 = this.get4RandomImages();
    },
    get4RandomImages() {
      return [
        {
          url: this.getRandomImage(),
        },
        {
          url: this.getRandomImage(),
        },
        {
          url: this.getRandomImage(),
        },
        {
          url: this.getRandomImage(),
        },
      ];
    },
    getRandomImage() {
      const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;
      return 'https://picsum.photos/512/512/?image=' + getRandomInt(50);
    },
    clearAll() {
      this.generatedImages = [];
      this.generatedImages1 = [];
      this.generatedImages2 = [];
      this.file = null;
      this.imageUrl = null;
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
