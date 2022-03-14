<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/imgs/logo.png">
        <HelloWorld msg="Welcome to devops-frontend-template" />
    </div>
</template>

<script>
// @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld
        }
    }
</script>

<style lang="scss" scoped>
.home {
    img {
        width: 300px;
    }
}
</style>
