<template>
  <b-container fluid>
    <!-- Upload Image Area -->
    <b-row>
      <b-col cols="3" md="3" sm="5">
        <div class="box border border-light">
          <h3>Upload image area</h3>
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
        </div>

        <!-- Select Action Area -->
        <div v-if="file" class="box border border-light my-3">
          <h3>Select Action Area</h3>
          <!-- Your action area content here -->
          <SelectActionComponent v-model="actionsValid"></SelectActionComponent>
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
        </div>
      </b-col>

      <!-- Image Rendering Area -->
      <b-col cols="9" md="9" sm="7" class="rendring">
        <div
          v-if="loaders.length || generated.length"
          class="box border border-light d-flex flex-column"
        >
          <h3>Image Rendering Area</h3>
          <RenderingComponent
            v-for="(loader, index) of loaders"
            :class="`order-${generated.length - index}`"
            :key="index"
            :loading="loader"
            :show-images="generated[index]"
            :label="`Rendering ${
              index + 1
            }: Automatic description of the room & style`"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RenderingComponent from './RenderingComponent.vue';
import SelectActionComponent from './SelectActionComponent.vue';
export default {
  name: 'ImageUploadComponent',
  components: {
    RenderingComponent,
    SelectActionComponent,
  },
  data() {
    return {
      file: null,
      imageUrl: null,
      generated: [],
      loaders: [],
      actionsValid: false,
    };
  },
  computed: {
    disableBtnGenerate() {
      return this.loaders.includes(true) || !this.actionsValid;
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

.box {
  border-radius: 8px;
  padding: 1em;
}
</style>
