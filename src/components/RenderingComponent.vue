<template>
  <!-- Placeholder for Rendring 1 images -->
  <b-form-group :label="label" label-size="lg" class="mt-3">
    <div v-if="loading">
      <div class="text-center">
        <b-img
          v-if="currentImage"
          :src="`data:image/png;base64,${currentImage}`"
          alt="Generated Image"
          class="generated mx-auto mb-3"
        ></b-img>
        <b-spinner class="mb-1" />
        <p>{{ (progress * 100).toFixed(0) }} %</p>
      </div>
    </div>
    <template v-else-if="showImages">
      <b-row>
        <!-- Placeholder for generated images -->
        <b-col md="6" lg="3" v-for="(image, index) in images" :key="index">
          <b-img
            :src="`data:image/png;base64,${image}`"
            alt="Generated Image"
            fluid
            class="generated mb-3"
            @click="openModal(index)"
          ></b-img>
        </b-col>
      </b-row>

      <div class="d-flex align-items-center mb-2">
        <b-form-checkbox class="mr-auto" v-model="showPrompt" switch>
          Show prompt options
        </b-form-checkbox>

        <div v-if="showPrompt" class="d-flex align-items-center">
          <b-form-radio-group v-model="showRawPrompt">
            <b-form-radio :value="false">Pills</b-form-radio>
            <b-form-radio :value="true">RAW</b-form-radio>
          </b-form-radio-group>
          <b-button-group>
            <b-button
              @click="
                copyText(prompt.positive.join(', '), 'Positive prompt copié 🚀')
              "
              size="sm"
              >Copy positive</b-button
            >
            <b-button
              @click="
                copyText(prompt.negative.join(', '), 'Negative prompt copié 🚀')
              "
              size="sm"
              >Copy négative</b-button
            >
          </b-button-group>
        </div>
      </div>

      <div v-show="showPrompt">
        <b-form-group
          v-if="showRawPrompt"
          label="Positive"
          :label-for="`positive-prompt-${index}`"
        >
          <b-form-textarea
            :id="`positive-prompt-${index}`"
            :value="prompt?.positive.join(', ')"
            disabled
          ></b-form-textarea>
        </b-form-group>

        <ul v-else>
          <li
            v-for="(item, index) in prompt?.positive"
            :key="index"
            class="prompt-item"
          >
            <b-badge pill variant="success">{{ item }}</b-badge>
          </li>
        </ul>

        <b-form-group
          v-if="showRawPrompt"
          label="Negative"
          :label-for="`negative-prompt-${index}`"
        >
          <b-form-textarea
            :id="`negative-prompt-${index}`"
            :value="prompt?.negative.join(', ')"
            disabled
          ></b-form-textarea>
        </b-form-group>

        <ul v-else>
          <li
            v-for="(item, index) in prompt?.negative"
            :key="index + 'n'"
            class="prompt-item"
          >
            <b-badge pill variant="danger">{{ item }}</b-badge>
          </li>
        </ul>
      </div>
    </template>

    <!-- Modal pour afficher l'image en taille réelle -->
    <b-modal
      v-model="showModal"
      :title="label"
      hide-footer
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      size="xl"
      centered
      v-if="showImages"
    >
      <CarousselComponent
        :images="images"
        :selected="selected"
      ></CarousselComponent>
    </b-modal>
  </b-form-group>
</template>

<script>
import CarousselComponent from './CarousselComponent.vue';

export default {
  name: 'RenderingComponent',
  components: { CarousselComponent },
  props: {
    label: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    showImages: {
      type: Boolean,
    },
    images: {
      type: Array,
    },
    currentImage: {
      type: String,
    },
    prompt: {
      type: Object,
    },
    index: {
      type: Number,
    },
    progress: {
      type: Number,
    },
  },
  data() {
    return {
      showPrompt: false,
      showRawPrompt: false,
      showModal: false,
      currentImageIndex: 0,
    };
  },
  methods: {
    async copyText(text, title = null) {
      try {
        await navigator.clipboard.writeText(text);
        this.makeToast('success', title ?? 'Texte copié', text);
      } catch (err) {
        console.error('Failed to copy: ', err);
        this.makeToast('danger', 'Error', err);
      }
    },
    makeToast(variant = null, title, msg) {
      this.$bvToast.toast(msg, {
        title,
        variant: variant,
        solid: true,
      });
    },
    openModal(index) {
      this.currentImageIndex = index;
      this.showModal = true;
      this.selected = index;
    },
    nextImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.currentImageIndex += 1;
      }
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex -= 1;
      }
    },
  },
};
</script>

<style scoped>
img.generated {
  border: solid 1px;
  border-radius: 8px;
  height: 240px;
  display: block;
}

.prompt-item {
  display: inline-block; /* Afficher les éléments côte à côte */
  margin: 5px;
}
</style>
