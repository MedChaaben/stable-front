<template>
  <div>
    <b-form-select
      v-model="actionChoice"
      :options="actions"
      @change="checkIsValid()"
      class="mb-3"
    ></b-form-select>
    <b-form-select
      v-if="actionChoice"
      v-model="roomChoice"
      :options="rooms"
      @change="checkIsValid()"
      class="mb-3"
    ></b-form-select>
    <b-form-select
      v-if="actionChoice && roomChoice"
      v-model="styleChoice"
      :options="styles"
      @change="checkIsValid()"
      class="mb-3"
    ></b-form-select>
  </div>
</template>

<script>
export default {
  name: 'SelectActionComponent',
  props: {},
  computed: {
    isValid: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  data() {
    return {
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
  methods: {
    checkIsValid() {
      this.isValid = this.actionChoice && this.roomChoice;
    },
  },
};
</script>
