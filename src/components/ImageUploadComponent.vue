<template>
  <div>
    <b-button v-b-toggle.sidebar size="sm" class="sidebar-toggle"
      >Sidebar</b-button
    >
    <b-sidebar
      id="sidebar"
      title="Configuration"
      shadow
      v-model="isSidebarOpen"
    >
      <div class="box border border-light">
        <b-form-file
          v-model="file"
          @change="onFileChanged"
          button-text="Charger une image"
          class="mb-3"
        />
        <b-button class="m-1" size="sm" @click="clearAll()"
          >clear images</b-button
        >
        <!-- Image preview -->
        <div v-if="imageUrl" class="mt-3">
          <b-img :src="imageUrl" alt="Image preview" class="img-loaded" fluid />
        </div>
      </div>
      <hr />
      <!-- Select Action Area -->
      <div v-if="file" class="box border border-light my-3">
        <!-- Your action area content here -->
        <SelectActionComponent
          v-model="actionsValid"
          @selectActionComponent::choices="setDescription($event)"
        />

        <b-button
          v-if="imageUrl"
          block
          class="mt-2"
          @click="generate()"
          :disabled="disableBtnGenerate"
        >
          Generate
        </b-button>
      </div>
    </b-sidebar>

    <div :class="{ 'content-collapsed': isSidebarOpen }" class="main-content">
      <div
        v-if="loaders.length || generated.length"
        class="box d-flex flex-column"
      >
        <h3>Image Rendering Area</h3>
        <RenderingComponent
          v-for="(loader, index) of loaders"
          :class="`order-${generated.length - index}`"
          :key="index"
          :loading="loader"
          :show-images="generated[index]"
          :label="getLabelRenderingComponent(index)"
        />
      </div>
    </div>
    <!-- Upload Image Area -->
  </div>
</template>

<script>
const POSITIVE = [
  'interior design',
  'detailed (white background )',
  'atmospheric',
  'canon eos c 3 0 0',
  'ƒ 1. 8',
  '3 5 mm',
  '8 k',
];

const NEGATIVE = [
  '(((stock photo)))',
  '((((ugly))))',
  '(((duplicate)))',
  '((morbid))',
  '((mutilated))',
  '[out of frame]',
  'extra fingers',
  'mutated hands',
  '((poorly drawn hands))',
  '((poorly drawn face))',
  '(((mutation)))',
  '(((deformed)))',
  '((ugly))',
  'blurry',
  '((bad anatomy))',
  '(((bad proportions)))',
  '((extra limbs))',
  'cloned face',
  '(((disfigured)))',
  'out of frame',
  'ugly',
  'extra limbs',
  '(bad anatomy)',
  'gross proportions',
  '(malformed limbs)',
  '((missing arms))',
  '((missing legs))',
  '(((extra arms)))',
  '(((extra legs)))',
  'mutated hands',
  '(fused fingers)',
  '(too many fingers)',
  '(((long neck)))',
  'grayscale',
  'black and white',
  '(((bad composition)))',
  '((((stock photo))))',
];

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
      descriptions: [],
      description: null,
      actionsValid: false,
      isSidebarOpen: true,
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
      this.descriptions.push(this.description);

      const negativePrompt = NEGATIVE.join(', ');
      const positivePrompt = [this.description, ...POSITIVE].join(', ');

      console.log('positivePrompt', positivePrompt);
      console.log('negativePrompt', negativePrompt);
    },
    setDescription(value) {
      this.description = `${value?.actionChoice}, ${value?.roomChoice}`;
      if (value.styleChoice) {
        this.description += `, ${value?.styleChoice}`;
      }
    },
    getLabelRenderingComponent(index) {
      if (this.descriptions[index]) {
        return `Rendering ${index + 1}: ${this.descriptions[index]}`;
      }
      // else return empty label
      return '';
    },
  },
};
</script>

<style>
:root {
  --sidebar-width: 350px; /* Définir la variable ici */
}

#sidebar {
  width: var(--sidebar-width);
}

.sidebar-toggle {
  position: fixed;
  left: 0;
}

.main-content {
  transition: margin-left 0.3s ease;
}

.content-collapsed {
  margin-left: var(--sidebar-width); /* Utiliser la variable ici */
}

.box {
  border-radius: 8px;
  padding: 1em;
}

.img-loaded {
  height: 180px !important;
}
</style>
