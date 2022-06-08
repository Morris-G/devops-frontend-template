<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <br>
        <h3>Installed Plugins</h3>
        <br>
        <ul>
            <li><a href="#">axios</a></li>
            <li><a href="#">babel</a></li>
            <li><a href="#">eslint</a></li>
            <li>
                <a href="http://bkui.fed.canway.com/">
                    <bk-tag theme="info" v-bk-tooltips="'已安装依赖并全局引入'">magic-box (ES Module)</bk-tag>
                </a>
            </li>
            <li><a href="#">nprogress</a></li>
            <li><a href="#">sass & sass-loader</a></li>
            <li><a href="#">svg-sprite-loader</a></li>
            <li><a href="#">vue-router</a></li>
            <li><a href="#">vuex</a></li>
        </ul>

        <div class="example-svg" v-bk-tooltips="'示例SVG'">
            <svg-icon
                size="36"
                name="to-top"
            >
            </svg-icon>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.example-svg {
  position: absolute;
  right: 100px;
  bottom: 100px;
}
</style>
