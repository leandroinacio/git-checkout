<template>
  <div id="git-content">
    <img alt="Vue logo" class="main__img" :src="data.avatar_url" />
    <div class="main__row">
      <label class="main__label">ID: {{data.id}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Github Username: {{data.login}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Github Name: {{data.name}}</label>
    </div>
    <div class="main__row" v-show="data.company">
      <label class="main__label">Company: {{data.company}}</label>
    </div>
    <div class="main__row" v-show="data.blog">
      <label class="main__label">Blog: {{data.blog}}</label>
    </div>
    <div class="main__row" v-show="data.location">
      <label class="main__label">Location: {{data.login}}</label>
    </div>
    <div class="main__row" v-show="data.email">
      <label class="main__label">Email: {{data.email}}</label>
    </div>
    <div class="main__row" v-show="data.bio">
      <label class="main__label">Bio: {{data.bio}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Public Repos: {{data.public_repos}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Public Gists: {{data.public_gists}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Followers: {{data.followers}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Following: {{data.following}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Created At: {{data.created_at}}</label>
    </div>
    <div class="main__row">
      <label class="main__label">Updated At: {{data.updated_at}}</label>
    </div>
    <div class="main__buttons">
      <Button msg="Previous" page="eula" :disabled="false" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import axios from 'axios'

// Const used to setup datetime standard
const localeString = 'en-US'

export default {
  name: 'git-data',
  data () {
    return {
      errorState: false,
      data: {}
    }
  },
  components: {
    Button
  },
  methods: {
    getGitData () {
      const userData = JSON.parse(sessionStorage.getItem('user'))

      axios.get(`https://api.github.com/users/${userData.userName}`).then(response => {
        this.data = response.data
        this.data.created_at = new Date(response.data.created_at).toLocaleString(localeString)
        this.data.updated_at = new Date(response.data.updated_at).toLocaleString(localeString)
      }).catch(error => {
        console.log(error)
        this.errorState = true
        this.data = error.data
      }).finally(() => {
        // Fix the heigh being calculated before fetch finished
        const mainDiv = document.getElementById('git-content')
        mainDiv.updatedHeight = '100%'
        this.$emit('calculateHeight', mainDiv)
      });
    }
  },
  created () {
    this.getGitData()
  }
}
</script>

<style scoped>
#git-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.main__buttons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.main__row {
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
}

.main__label {
  width: 25rem;
}

@media all and (max-width: 50rem) {
  .main__label {
    width: 100%;
  }

  .main__img {
    background-size: cover;
    max-width: 100%;
  }
}
</style>
