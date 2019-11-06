<template>
  <div>
    <!-- Should think about making components from these rows -->
    <!-- First Name -->
    <div class="main__row">
      <label for="first-name" class="main__label">First Name:</label>
      <input
        id="first-name"
        :class="['main__input', { 'main__input--success': user.firstName.length, 'main__input--invalid': isFirstNameEmptyAndDirty }]"
        type="text" @keyup.once="setFieldDirty('firstName')"
        v-model="user.firstName"
      />
      <transition name="fade" mode="out-in">
        <small class="main__msg--error" v-show="isFirstNameEmptyAndDirty">First name is required.</small>
      </transition>
    </div>

    <!-- Last Name -->
    <div class="main__row">
      <label for="last-name" class="main__label">Last Name:</label>
      <input
        id="last-name"
        :class="['main__input', { 'main__input--success': user.lastName.length, 'main__input--invalid': isLastNameEmptyAndDirty }]"
        type="text" @keyup.once="setFieldDirty('lastName')"
        v-model="user.lastName"
      />
      <transition name="fade" mode="out-in">
        <small class="main__msg--error" v-show="isLastNameEmptyAndDirty">Last name is required.</small>
      </transition>
    </div>

    <!-- UserName -->
    <div class="main__row">
      <label for="github-name" class="main__label">Github Username:</label>
      <input
        id="github-name"
        :class="['main__input', { 'main__input--success': !isUserNameNotFound, 'main__input--invalid': (isUserNameEmptyAndDirty || isUserNameNotFound) && user.userName.length }]"
        type="text" @keyup.once="setFieldDirty('userName')"
        v-model="user.userName" />
      <!-- These error messages should become a component next time -->
      <transition name="fade" mode="out-in">
        <small class="main__msg--error" v-show="isUserNameEmptyAndDirty">Username is required.</small>
      </transition>
      <transition name="fade" mode="out-in">
        <small class="main__msg--error" v-show="!isUserNameValidated && user.userName.length">Git user was not validated.</small>
      </transition>
      <transition name="fade" mode="out-in">
        <small class="main__msg--error" v-show="isUserNameNotFound && isUserNameValidated">Git user was not found.</small>
      </transition>
    </div>

    <!-- Nav -->
    <nav class="main__buttons">
      <Button msg="Previous" page="home" :disabled="false" />
      <Button msg="Validate User" v-show="isUserNameNotFound" eventName="validateUserName" v-on:validateUserName="validateUserName" :disabled="!user.userName.length" />
      <Button msg="Next" v-show="!isUserNameNotFound" page="eula" :disabled="isInfoInvalid" />
    </nav>
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

      // For form validation, could have used vuelidade, but decided to do it without to exercise the framework capabilities
      isFieldDirty: {
        firstName: false,
        lastName: false,
        userName: false
      },
      validatedUser: {
        lastValid: '',
        lastAttempt: ''
      }
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

      // This fetch should become a method in a repository file in the real world
      // Axios configuration should be defined in the real world
      axios.get(`https://api.github.com/users/${this.user.userName}`).then(response => {
        this.validatedUser.lastValid = this.user.userName
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.validatedUser.lastAttempt = this.user.userName
        this.setFieldDirty('userName')
      })
    }
  },
  computed: {
    isInfoInvalid () {
      return !(this.user.firstName.length && this.user.lastName.length && this.user.userName.length) || this.isUserNameNotFound
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
    isUserNameNotFound () {
      return !this.user.userName.length || !this.validatedUser.lastValid.length || this.validatedUser.lastValid !== this.user.userName
    },
    isUserNameValidated () {
      return this.user.userName.length && (this.validatedUser.lastAttempt.length || this.validatedUser.lastValid.length) && (this.validatedUser.lastValid === this.user.userName || this.validatedUser.lastAttempt === this.user.userName)
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
