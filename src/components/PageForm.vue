<template>
    <div class="container mt-5">
      <!-- Section de description textuelle -->
      <div class="mb-3">
        <label for="textDescription" class="form-label">Description textuelle</label>
        <b-form-textarea
          id="textDescription"
          v-model="description"
          placeholder="Entrez une description ici..."
          rows="3"
          max-rows="6">
        </b-form-textarea>
      </div>
  
      <!-- Section de téléchargement d'image -->
      <div class="mb-3">
        <label for="imageUpload" class="form-label">Télécharger une image</label>
        <b-form-file
          id="imageUpload"
          v-model="uploadedImage"
          @input="handleFileUpload"
          accept="image/*">
        </b-form-file>
      </div>
  
      <!-- Section de réglage des paramètres -->
      <div class="mb-3">
        <label for="parameterSlider" class="form-label">Ajuster les paramètres</label>
        <b-form-input
          id="parameterSlider"
          v-model="sliderValue"
          type="range"
          min="0"
          max="100"
          step="1"
          variant="primary">
        </b-form-input>
        {{ sliderValue }}
      </div>
  
      <!-- Bouton de soumission -->
      <b-button variant="primary" @click="submitData">Générer</b-button>
    </div>
  </template>
  
  <script>
  import { BFormTextarea, BFormFile, BButton, BFormInput } from 'bootstrap-vue';
  import StableDiffusionService from '../services/StableDiffusionService.ts'; // Remplacer avec le chemin correct
  
  export default {
    name: 'PageForm',
    components: {
      BFormTextarea, BFormFile, BButton, BFormInput
    },
    data() {
      return {
        description: '', // La description textuelle
        uploadedImage: null, // L'image téléchargée
        sliderValue: 50, // Valeur initiale du slider
        stableDiffusionService: new StableDiffusionService('http://localhost:5000'),
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.uploadedImage = file ? URL.createObjectURL(file) : null;
      },
      async submitData() {
        try {
          const result = await this.stableDiffusionService.generateImage(this.description, this.uploadedImage, this.sliderValue);
          console.log(result);
          // Traiter le résultat ici
        } catch (error) {
          console.error("Erreur lors de la génération de l'image:", error);
        }
      }
    }
  };
  </script>
  
  <style>
    /* Ajoutez vos styles personnalisés ici */
  </style>
  