<template>
  <!-- Placeholder for Rendring 1 images -->
  <b-form-group :label="label" class="mt-3">
    <div v-if="loading">
      <div class="text-center">
        <b-spinner />
        <p>Loading images...</p>
      </div>
    </div>
    <template v-else-if="showImages">
      <b-button
        variant="primary"
        size="sm"
        class="mb-2"
        @click="showPrompt = !showPrompt"
      >
        {{ showPrompt ? 'Hide' : 'Show' }} prompt
      </b-button>

      <b-button-group v-if="showPrompt" class="float-right">
        <b-button @click="showRawPrompt = !showRawPrompt" size="sm">
          {{ showRawPrompt ? 'Pills' : 'RAW' }}
        </b-button>
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

      <b-card
        class="mt-2"
        v-show="showPrompt"
        bg-variant="dark"
        text-variant="white"
      >
        <div class="prompt-display">
          <h5>Positive Prompts</h5>

          <div v-if="showRawPrompt">
            {{ prompt?.positive.join(', ') }}
          </div>
          <ul v-else>
            <li
              v-for="(item, index) in prompt?.positive"
              :key="index"
              class="prompt-item"
            >
              <b-badge pill variant="success">{{ item }}</b-badge>
            </li>
          </ul>

          <h5>Negative Prompts</h5>
          <div v-if="showRawPrompt">
            {{ prompt?.negative.join(', ') }}
          </div>
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
      </b-card>
      <b-row>
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
    </template>
  </b-form-group>
</template>

<script>
import ImageGeneratorService from '@/services/ImageGeneratorService';

export default {
  name: 'RenderingComponent',
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
    prompt: {
      type: Object,
    },
  },
  data() {
    return {
      imageGeneratorService: new ImageGeneratorService(
        'https://picsum.photos/512/512/?image='
      ),
      generatedImages: [],
      showPrompt: false,
      showRawPrompt: false,
    };
  },
  async mounted() {
    await this.get4RandomImages();
  },
  methods: {
    async get4RandomImages() {
      const promises = Array.from({ length: 4 }, () =>
        this.imageGeneratorService.generateImage()
      );
      this.generatedImages = (await Promise.all(promises)).map((str) => ({
        url: str,
      }));
      this.$emit('generated:finish', this.generatedImages);
      console.log(this.generatedImages);
    },
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

.prompt-display {
  margin-top: 1rem;
}

.prompt-item {
  display: inline-block; /* Afficher les éléments côte à côte */
  margin: 5px;
}
</style>
