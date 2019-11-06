<template>
  <div>
    <router-link v-if="!eventName" :to="{ name: page }" :disabled="disabled" tag="button" :class="['main__button', { disabled: disabled }, classes]">{{msg}}</router-link>
    <button v-else @click="triggerEvent" :disabled="disabled" :class="['main__button', { disabled: disabled }, classes]">{{msg}}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  methods: {
    triggerEvent () {
      this.$emit(this.eventName)
    }
  },
  props: {
    msg: String,
    page: String,
    classes: String,
    disabled: Boolean,
    eventName: String
  }
}
</script>

<style scoped>
.main__button {
  display: inline-block;
  border: none;
  background-color: #4cb450;
  font-size: 1.5rem;
  color: white;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  cursor: pointer;
  min-width: 10rem;
  transition: 0.3s;
}

.main__button:hover {
  background-color: #46a049;
}

.main__button.disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

@media all and (max-width: 50em) {
  .main__button {
    display: block;
    margin: 0.4em auto;
    width: 95vw;
  }
}
</style>
