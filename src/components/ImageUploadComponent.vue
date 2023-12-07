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
        <b-card v-if="loading || generate1" title="Image Rendering Area">
          <!-- Placeholder for Rendring 1 images -->
          <RenderingComponent
            v-if="loading || generate1"
            :loading="loading"
            :show-images="generate1"
            label="Newest rendering: Automatic description of the room & style"
          />

          <RenderingComponent
            v-if="generate2"
            :loading="loading"
            :show-images="generate2"
            label="Rendering 1: Automatic description of the room & style"
          />

          <RenderingComponent
            v-if="generate3"
            :loading="loading"
            :show-images="generate3"
            label="Rendering 2: Automatic description of the room & style"
          />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RenderingComponent from './RenderingComponent.vue';
export default {
  name: 'ImageUploadComponent',
  components: {
    RenderingComponent,
  },
  data() {
    return {
      file: null,
      imageUrl: null,
      loading: false,
      generate1: false,
      generate2: false,
      generate3: false,
    };
  },
  methods: {
    onFileChanged(e) {
      const file = e?.target?.files?.[0];
      this.createImage(file);
    },
    async createImage(file) {
      const reader = new FileReader();
      this.loading = true;

      reader.onload = async (e) => {
        this.imageUrl = e.target.result;
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Attendre 3 secondes
        this.loading = false;
        this.generate1 = true;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Attendre 2 secondes
        this.generate2 = true;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Attendre 2 secondes
        this.generate3 = true;
      };

      reader.readAsDataURL(file);
    },
    clearAll() {
      this.generate1 = false;
      this.generate2 = false;
      this.generate3 = false;
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
