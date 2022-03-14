<template>
    <div class="back-to-top" v-show="isShow">
        <svg-icon
            size="36"
            name="to-top"
            svg-title="回到顶部"
            @item-click="backToTop"
        >
        </svg-icon>
    </div>
</template>

<script>
    export default {
        name: 'BackToTop',
        props: {
            selector: {
                type: String,
                default: undefined
            }
        },
        data () {
            return {
                isShow: false
            }
        },
        methods: {
            backToTop () {
                const container = document.querySelector(this.selector)
                if (container?.scrollTop) {
                    container.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }
            },
            assign () {
                this.isShow = false
                const container = document.querySelector(this.selector)
                if (container) {
                    container.addEventListener('scroll', () => {
                        if (container.scrollTop > 0) {
                            this.isShow = true
                        } else {
                            this.isShow = false
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-to-top {
    display: flex;
    position: fixed;
    bottom: 40px;
    right: 40px;
    ::v-deep svg {
        opacity: .8;
        cursor: pointer;
        filter: grayscale(1);
        &:hover {
            opacity: 1;
            filter: grayscale(0);
        }
    }
}
</style>
