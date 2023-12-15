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
    advanced: {
      type: Boolean,
    },
    index: {
      type: Number,
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
  watch: {
    advanced(value) {
      if (value) {
        this.showPrompt = true;
        this.showRawPrompt = false;
      } else {
        this.showPrompt = false;
        this.showRawPrompt = false;
      }
    },
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

.prompt-item {
  display: inline-block; /* Afficher les éléments côte à côte */
  margin: 5px;
}
</style>
