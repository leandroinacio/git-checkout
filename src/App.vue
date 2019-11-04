<template>
  <div id="app">
    <div class="loader" v-show="isLoading"></div>
    <header v-show="!isLoading">{{$route.meta.title}}</header>
    <main class="main" v-show="!isLoading">
      <transition :name="transition" mode="out-in" @beforeLeave="beforeLeave" @enter="enter">
        <router-view v-on:calculateHeight="enter" v-on:loading="setLoadingStatus" />
      </transition>
    </main>
    <footer v-show="!isLoading">
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
      transition: 'slide-right',
      isLoading: false
    }
  },
  methods: {
    setLoadingStatus (status) {
      this.isLoading = status
    },
    // Recalculate height to transition footer smoothly
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter (element) {
      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = '100%'
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

.main__msg--error {
  color: red;
  padding: 1rem;
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

  .main__msg--error {
    width: 95%;
    display: block;
  }
}

/* LOADER */
.loader {
  border: 1.6rem solid white;
  border-radius: 50%;
  border-top: 1.6rem solid #273b66;
  width: 12rem;
  height: 12rem;
  animation: spin 1s linear infinite;
  transition: max-height 0.3s ease-in-out;
}

@keyframes spin {
  0% {
    transform: rodate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
