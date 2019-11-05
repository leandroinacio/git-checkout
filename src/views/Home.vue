<template>
  <div>
    <p class="main__paragraph">Hello stranger! As you can see, this is an exercise where I use Github's API to retrieve the user's data using Vue. In the next pages you will be asked your name and Github ID, as well as confirmation that you agree with the terms and services before being displayed your Github's avatar and some information about you.</p>
    <nav class="main__row main__buttons">
      <Button msg="Next" page="simple-form" :disabled="false" />
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'

export default {
  name: 'home',
  components: {
    Button
  }
}
</script>

<style scoped>
.main__buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.main__paragraph {
  margin-bottom: 2rem;
}
</style>
