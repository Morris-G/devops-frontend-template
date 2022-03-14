<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'devops-app',
        watch: {
            $route: {
                handler (to, from) {
                    // this.$syncUrl(to.fullPath)
                },
                immediate: true
            }
        },
        created () {
            const callback = e => {
                this.$bkMessage({
                    message: (e.reason || e).message,
                    theme: 'error'
                })
            }
            window.addEventListener('unhandledrejection', callback)
            Vue.config.errorHandler = callback
        }
    }
</script>

<style lang="scss">
@import './assets/scss/index.scss';
@import './assets/scss/nprogress.scss';

#app {
    padding-top: 100px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
