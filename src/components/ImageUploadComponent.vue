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
          <b-button class="m-1" @click="clearAll()">clear images</b-button>
          <!-- Image preview -->
          <div v-if="imageUrl" class="mt-3">
            <b-img :src="imageUrl" alt="Image preview" fluid />
          </div>
        </b-card>

        <!-- Select Action Area -->
        <b-card v-if="file" title="Select Action Area" class="my-3">
          <!-- Your action area content here -->
          <b-form-select
            v-model="actionChoice"
            :options="actions"
            class="mb-3"
          ></b-form-select>
          <b-form-select
            v-if="actionChoice"
            v-model="roomChoice"
            :options="rooms"
            class="mb-3"
          ></b-form-select
          ><b-form-select
            v-if="actionChoice && roomChoice"
            v-model="styleChoice"
            :options="styles"
            class="mb-3"
          ></b-form-select>
          <div>
            <b-button
              v-if="imageUrl"
              class="mt-2"
              @click="generate()"
              :disabled="disableBtnGenerate"
            >
              Generate
            </b-button>
          </div>
        </b-card>
      </b-col>

      <!-- Image Rendering Area -->
      <b-col cols="12" md="8" class="rendring">
        <b-card
          v-if="loaders.length || generated.length"
          title="Image Rendering Area"
        >
          <RenderingComponent
            v-for="(loader, index) of loaders"
            :key="index"
            :loading="loader"
            :show-images="generated[index]"
            :label="`Rendering ${
              index + 1
            }: Automatic description of the room & style`"
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
      generated: [],
      loaders: [],
      actionChoice: null,
      roomChoice: null,
      styleChoice: null,
      actions: [
        { value: null, text: 'Choisir une action' },
        { value: 'redecorate', text: 'Redécorer' },
        { value: 'furnish', text: 'Meubler' },
        { value: 'declutter', text: 'Désencombrer' },
      ],
      rooms: [
        { value: null, text: 'Choisir une action' },
        { value: 'living_room', text: 'Salon' },
        { value: 'bedroom', text: 'Chambre' },
        // ... other room options ...
      ],
      styles: [
        { value: null, text: 'Choisir une action' },
        { value: 'modern', text: 'Moderne' },
        { value: 'minimalist', text: 'Minimaliste ' },
        { value: 'futurism', text: 'Futuriste' },
        { value: 'rococo', text: 'Rococo' },
        { value: 'baroque', text: 'Baroque' },
        { value: 'industrial', text: 'Industrial' },
        { value: 'art_deco', text: 'Art déco' },
        // ... other room options ... rococo style 5) baroque 6) industrial style 7) art deco
      ],
    };
  },
  computed: {
    disableBtnGenerate() {
      return (
        this.loaders.includes(true) || !this.actionChoice || !this.roomChoice
      );
    },
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
        await this.generate();
      };

      reader.readAsDataURL(file);
    },
    clearAll() {
      this.generated = [];
      this.loaders = [];
      this.file = null;
      this.imageUrl = null;
    },
    async generate() {
      this.loaders.push(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.loaders = this.loaders.map(() => false);
      this.generated.push(true);
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
