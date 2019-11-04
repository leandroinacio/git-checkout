<template>
  <div>
    <!-- Should think about making components from these rows -->
    <div class="main__row">
      <label for="first-name" class="main__label">First Name:</label>
      <input
        id="first-name"
        :class="['main__input', { 'main__input--success': user.firstName.length, 'main__input--invalid': !user.firstName.length }]"
        type="text"
        v-model="user.firstName"
      />
    </div>
    <div class="main__row">
      <label for="last-name" class="main__label">Last Name:</label>
      <input
        id="last-name"
        :class="['main__input', { 'main__input--success': user.lastName.length, 'main__input--invalid': !user.lastName.length }]"
        type="text"
        v-model="user.lastName"
      />
    </div>
    <div class="main__row">
      <label for="github-name" class="main__label">Github Username:</label>
      <input
        id="github-name"
        :class="['main__input', { 'main__input--success': user.userName.length, 'main__input--invalid': !user.userName.length }]"
        type="text"
        v-model="user.userName"
      />
    </div>
    <div class="main__buttons">
      <Button msg="Previous" page="home" :disabled="false" />
      <Button msg="Next" page="eula" :disabled="isInfoInvalid" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'simple-form',
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        userName: ''
      }
    }
  },
  methods: {
    checkGithub () {
      return true
    }
  },
  computed: {
    isInfoInvalid () {
      return !(this.user.firstName.length && this.user.lastName.length && this.user.userName.length)
    }
  },
  components: {
    Button
  },

  // Load previously entered data - for better user experience
  created () {
    const userData = JSON.parse(sessionStorage.getItem('user'))
    if (userData && Object.keys(userData).length) {
      this.user.firstName = userData.firstName
      this.user.lastName = userData.lastName
      this.user.userName = userData.userName
    }
  },

  // Save entered data before changing page for better user experience
  beforeDestroy () {
    sessionStorage.setItem('user', JSON.stringify(this.user))
  }
}
</script>

<style scoped>
.main__buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media all and (max-width: 50rem) {
  .main__label {
    width: 20rem;
  }
}
</style>
