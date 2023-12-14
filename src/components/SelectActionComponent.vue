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
export default {
  name: 'SelectActionComponent',
  props: {
    value: Boolean,
  },
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
      positivePrompt: null,
      negativePrompt: null,
    };
  },
  methods: {
    checkIsValid() {
      this.isValid = this.actionChoice && this.roomChoice;
      if (this.isValid) {
        this.negativePrompt = NEGATIVE.join(', ');
        this.positivePrompt = [
          this.actionChoice,
          this.roomChoice,
          this.styleChoice,
          ...POSITIVE,
        ]
          .filter((el) => el) // remove null values
          .join(', ');
        console.log('positivePrompt', this.positivePrompt);
        console.log('negativePrompt', this.negativePrompt);
      }
    },
  },
};
</script>
