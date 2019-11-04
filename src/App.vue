<template>
  <div id="app" class="content">
    <header>{{$route.meta.title}}</header>
    <main class="main">
      <transition :name="transition" mode="out-in" @beforeLeave="beforeLeave" @enter="enter">
        <router-view v-on:calculateHeight="enter" />
      </transition>
    </main>
    <footer>
      <small>
        Created by
        <a href="https://www.linkedin.com/in/leinaciosouza/">Leandro Inácio</a> on 2019
      </small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transition: 'slide-right'
    }
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter (element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = element.updatedHeight || height;
      });
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      // Add transition to the left or to the right, depending on page level (defined on router/index.js)
      this.transition =
        to.meta.level < from.meta.level ? 'slide-right' : 'slide-left'

      next()
    })

    // Check for any existing user data before allowing navigation to different pages
    // const userData = JSON.parse(sessionStorage.getItem('user'));
    // if (!userData || !userData.username || !userData.firstName || !userData.lastName) {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css";

:root {
  font-family: "Roboto", sans-serif;
  background-color: #b9b8d2;
  font-size: 16px;
  overflow: scroll;
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

header {
  border: 1px solid black;
  width: 50rem;
  max-height: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 1rem;
  background-color: #273b66;
  color: white;
  font-weight: bold;
  padding: 0.5rem 0.5rem;
  border: #273b66 solid 1px;
}

footer {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 50rem;
  max-height: 2rem;
  padding: 0.5rem 0.5rem;
  border: #273b66 solid 1px;
  background-color: #273b66;
  color: white;
}

a {
  color: #7faded;
  text-decoration: none;
}

a:visited {
  color: #afbca1;
}

.main {
  width: 50rem;
  font-size: 1rem;
  justify-content: center;
  align-content: center;
  padding: 0.5rem 0.5rem;
  border-left: #273b66 solid 1px;
  border-right: #273b66 solid 1px;
  background-color: #dfdedc;
}

.main__label {
  display: inline-block;
  width: 9rem;
  padding: 0.2rem;
}

.main__row {
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.main__input {
  display: inline-block;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 1.2rem;
}

.main__input--success {
  border: 1px solid #46a049;
}

.main__input--invalid {
  border: 1px solid #c83531;
}

@media all and (max-width: 50rem) {
  header {
    margin: auto;
    width: 95%;
    font-size: 30px;
    max-height: 4rem;
  }

  .main {
    margin: auto;
    font-size: 30px;
    width: 95%;
  }

  footer {
    margin: auto;
    width: 95%;
  }
}

/* Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  overflow: hidden;
  transition-property: height, opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.55, 0.1, 0.1, 0.5);
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(1.5em, 0);
  opacity: 0;
}

.slide-left-leave-active,
.slide-right-enter {
  transform: translate(-1.5em, 0);
  opacity: 0;
}
</style>
