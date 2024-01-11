<template>
  <div>
    <vue-topprogress ref="topProgress" color="red" />
    <b-button v-b-toggle.sidebar class="sidebar-toggle">Sidebar</b-button>
    <b-sidebar
      id="sidebar"
      title="Configuration"
      shadow
      v-model="isSidebarOpen"
    >
      <template #footer v-if="imageUrl">
        <div class="d-flex justify-content-center bg-light text-dark px-3 py-2">
          <b-button class="m-1" @click="reset()" size="sm"
            >Annuler tout</b-button
          >

          <b-button
            class="m-1"
            size="sm"
            @click="generate()"
            :disabled="disableBtnGenerate"
          >
            Generate
          </b-button>
        </div>
      </template>

      <div class="m-2">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          @change="onFileChanged"
          button-text="Charger une image"
          placeholder="déposez une image"
          class="p-2"
        />
      </div>
      <!-- Image preview -->
      <div v-if="imageUrl" class="mt-3">
        <b-img :src="imageUrl" alt="Image preview" class="img-loaded" fluid />
      </div>

      <!-- Select Action Area -->
      <SelectActionComponent
        v-if="file"
        class="px-4 mt-4"
        v-model="actionsValid"
        @selectActionComponent::choices="setDescription($event)"
      />
    </b-sidebar>
    <div :class="{ 'content-collapsed': isSidebarOpen }" class="main-content">
      <div
        v-if="loaders.length || generated.length"
        class="box d-flex flex-column"
      >
        <template v-for="(loader, index) in loaders">
          <RenderingComponent
            :class="`order-${generated.length - index} border-bottom`"
            :key="index"
            :loading="loader"
            :progress="progress"
            :current-image="currentImages[index]"
            :images="generated[index]"
            :show-images="Boolean(generated[index])"
            :label="getLabelRenderingComponent(index)"
            :prompt="prompts[index]"
            :index="index"
            @delete-image="handleDeleteImage(index, $event)"
          />
        </template>
      </div>
    </div>
    <!-- Upload Image Area -->
  </div>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress';
import RenderingComponent from './RenderingComponent.vue';
import SelectActionComponent from './SelectActionComponent.vue';
import StableDiffusionService from '@/services/StableDiffusionService';
import { NEGATIVE, POSITIVE } from '@/constants';

export default {
  name: 'ImageUploadComponent',
  components: {
    RenderingComponent,
    SelectActionComponent,
    vueTopprogress,
  },
  data() {
    return {
      file: null,
      image: null,
      imageUrl: null,
      generated: [],
      loaders: [],
      currentImages: [],
      descriptions: [],
      description: null,
      prompts: [],
      actionsValid: false,
      isSidebarOpen: true,
      stableDiffusionService: new StableDiffusionService(),
      progress: 0,
      progressInterval: null,
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
        this.image = new Image();
        this.image.src = this.imageUrl;
      };

      reader.readAsDataURL(file);
    },
    reset() {
      this.interrupt();
      this.generated = [];
      this.loaders = [];
      this.descriptions = [];
      this.currentImages = [];
      this.file = null;
      this.imageUrl = null;
      this.description = null;
      this.actionsValid = false;
      this.prompts = [];
    },
    async generate() {
      this.loaders.push(true);
      this.scrollToTop();
      this.descriptions.push(this.description);

      this.prompts.push({
        negative: NEGATIVE,
        positive: [...this.description.split(', '), ...POSITIVE],
      });

      this.$refs.topProgress.start();
      this.$refs.topProgress.pause();
      this.currentImages.push(null);

      this.progressInterval = setInterval(async () => {
        const { progress, current_image } =
          await this.stableDiffusionService.progress();
        this.currentImages.pop();
        this.currentImages.push(current_image);
        this.progress = progress;
        this.$refs.topProgress.set(progress * 100);
      }, 1500);

      const { images } = await this.stableDiffusionService.img2img({
        steps: 20,
        batch_size: 4,
        n_iter: 1,
        cfg_scale: 7,
        width: 512,
        height: 512 / (this.image.width / this.image.height),
        prompt: [this.description, ...POSITIVE].join(','),
        negative_prompt: NEGATIVE.join(','),
        init_images: this.generated.length
          ? this.generated.slice(-1).flat()
          : [this.image.src],
      });

      // end generate
      this.generated.push(images);
      this.$refs.topProgress.done();
      clearInterval(this.progressInterval);
      this.loaders = this.loaders.map(() => false);
      this.progress = 0;
    },
    async interrupt() {
      await this.stableDiffusionService.interrupt();
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
    scrollToTop() {
      window.scrollTo({
        top: 0, // Haut de la page
        left: 0, // Gauche de la page
        behavior: 'smooth', // Défilement fluide
      });
    },
    handleDeleteImage(index, event) {
      this.generated[index].splice(event, 1);
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

.img-loaded {
  height: 180px !important;
}
</style>
