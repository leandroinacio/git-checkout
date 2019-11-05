<template>
  <div>
    <!-- Should think about making components from these rows -->
    <div class="main__row">
      <label for="github-name" class="main__label">Github Username:</label>
      <input
        id="github-name"
        :class="['main__input', { 'main__input--success': isUserNameValid, 'main__input--invalid': isUserNameEmptyAndDirty || isUserNotFound }]"
        type="text" @keyup.once="setFieldDirty('userName')"
        v-model="user.userName" @change="validateUserName"
      />
      <small class="main__msg--error" v-show="isUserNameEmptyAndDirty">Username is required.</small>
      <small class="main__msg--error" v-show="isUserNotFound && !isUserNameEmptyAndDirty">Git user was not found.</small>
    </div>
    <div class="main__row">
      <label for="first-name" class="main__label">First Name:</label>
      <input
        id="first-name"
        :class="['main__input', { 'main__input--success': user.firstName.length, 'main__input--invalid': isFirstNameEmptyAndDirty }]"
        type="text" @keyup="setFieldDirty('firstName')"
        v-model="user.firstName"
      />
      <small class="main__msg--error" v-show="isFirstNameEmptyAndDirty">First name is required.</small>
    </div>
    <div class="main__row">
      <label for="last-name" class="main__label">Last Name:</label>
      <input
        id="last-name"
        :class="['main__input', { 'main__input--success': user.lastName.length, 'main__input--invalid': isLastNameEmptyAndDirty }]"
        type="text" @keyup.once="setFieldDirty('lastName')"
        v-model="user.lastName"
      />
      <small class="main__msg--error" v-show="isLastNameEmptyAndDirty">Last name is required.</small>
    </div>
    <div class="main__buttons">
      <Button msg="Previous" page="home" :disabled="false" />
      <Button msg="Next" page="eula" :disabled="isInfoInvalid" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import axios from 'axios'

export default {
  name: 'simple-form',
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        userName: ''
      },
      isFieldDirty: {
        firstName: false,
        lastName: false,
        userName: false
      },
      isUserNameValid: false
    }
  },
  watch: {

    // Save entered data for better user experience - do not save checkbox status, make sure user always check it
    user: {
      handler () {
        sessionStorage.setItem('user', JSON.stringify(this.user))
      },
      deep: true
    }
  },
  methods: {
    setFieldDirty (field) {
      this.isFieldDirty[field] = true
    },
    validateUserName () {
      if (!this.user.userName.length) return
      axios.get(`https://api.github.com/users/${this.user.userName}`).then(response => {
        this.isUserNameValid = true
      }).catch(error => {
        console.log(error)
        this.isUserNameValid = false
      })
    }
  },
  computed: {
    isInfoInvalid () {
      return !(this.user.firstName.length && this.user.lastName.length && this.user.userName.length) || this.isUserNotFound
    },
    isFirstNameEmptyAndDirty () {
      return !this.user.firstName.length && this.isFieldDirty.firstName
    },
    isLastNameEmptyAndDirty () {
      return !this.user.lastName.length && this.isFieldDirty.lastName
    },
    isUserNameEmptyAndDirty () {
      return !this.user.userName.length && this.isFieldDirty.userName
    },
    isUserNotFound () {
      return this.isFieldDirty.userName && !this.isUserNameValid
    }
  },
  components: {
    Button
  },

  // Load previously entered data - for better user experience
  created () {
    const userData = JSON.parse(sessionStorage.getItem('user'))
    if (userData && Object.keys(userData).length) {
      this.user = userData
      if (this.user.userName) {
        this.isFieldDirty.userName = true
        this.validateUserName()
      }
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

@media all and (max-width: 50rem) {
  .main__label {
    width: 20rem;
  }
}
</style>
