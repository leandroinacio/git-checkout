<template>
  <div>
    <div class="main__row">
      <label for="email" class="main__label">Email</label>
      <input id="email" type="email"
      :class="['main__input', { 'main__input--success': email.length, 'main__input--invalid': !email.length }]"
      v-model="email" />
    </div>
    <div class="main__row">
      <input id="eula" type="checkbox" v-model="eula" />
      <label for="eula" class="main__label--eula">I agree with terms and services</label>
    </div>
    <div class="main__buttons">
      <Button msg="Previous" page="simple-form" :disabled="false" />
      <Button msg="Next" page="git-data" :disabled="isInfoInvalid" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'eula',
  data () {
    return {
      email: '',
      eula: false
    }
  },
  components: {
    Button
  },
  computed: {
    isInfoInvalid () {
      return !(this.email.length && this.eula)
    }
  },

  // Load previously entered data - for better user experience
  created () {
    this.email = sessionStorage.getItem('email')
  },

  // Save entered data for better user experience - do not save checkbox status, make sure user always check it
  beforeDestroy () {
    sessionStorage.setItem('email', this.email)
  }
}
</script>

<style scoped>
.main__buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.main__label--eula {
  margin: 2rem, 1rem;
  padding: 0.5rem;
  width: 20rem;
}

@media all and (max-width: 50rem) {
  .main__label {
    width: 20rem;
  }
}
</style>
