<template>
  <div>
    <div class="main__row">
      <label for="email" class="main__label">Email</label>
      <input id="email" type="email" @keyup.once="isEmailDirty=true"
      :class="['main__input', { 'main__input--success': isEmailValid, 'main__input--invalid': isEmailEmptyAndDirty || (!isEmailValid && this.email.length) }]"
      v-model="email" />
      <small class="main__msg--error" v-show="isEmailEmptyAndDirty">Email is required.</small>
      <small class="main__msg--error" v-show="!isEmailValid && email.length">Invalid email.</small>
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
      isEmailDirty: false,
      eula: false
    }
  },
  watch: {
    // Save entered data for better user experience - do not save checkbox status, make sure user always check it
    email () {
      sessionStorage.setItem('email', this.email)
    }
  },
  components: {
    Button
  },
  computed: {
    isInfoInvalid () {
      return !(this.isEmailValid && this.eula)
    },
    isEmailEmptyAndDirty () {
      return !this.email.length && this.isEmailDirty
    },
    isEmailValid () {
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return this.isEmailDirty && this.email.length && emailPattern.test(this.email)
    }
  },

  // Load previously entered data - for better user experience
  created () {
    const email = sessionStorage.getItem('email')
    if (email) {
      this.isEmailDirty = true
      this.email = email
    }
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
