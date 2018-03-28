<template>
    <div id="app">
        <nav>
            <router-link :to="{name:'index'}"><span></span><span>首页</span></router-link>
            <router-link :to="{name:'cat'}"><span></span><span>分类</span></router-link>
            <router-link :to="{name:'sort'}"><span></span><span>排行榜</span></router-link>
            <router-link :to="{name:'catlist'}"><span></span><span>书城</span></router-link>
            <router-link :to="{name:'setting'}"><span></span><span>设置</span></router-link>
        </nav>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'novel-electron',
        data() {
            return {
                transitionName: "slide-left"
            }
        },
        watch: {
            '$route'() {
                const prevRouteIndex = localStorage.getItem("prevRouteIndex");
                const nextRouteIndex = localStorage.getItem("nextRouteIndex");
                this.transitionName = prevRouteIndex < nextRouteIndex ? 'slide-right' : 'slide-left';
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        position: relative;
        padding-left: 12vw;
        padding-right: 2vw;
        width: 100vw;
        min-height: 100vh;
        -webkit-overflow-scrolling: touch;
    }

    nav {
        position: fixed;
        width: 10vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 99;
        background: #c9c9c9;
        a {
            display: block;
            height: 10vh;
            line-height: 10vh;
            text-align: center;
        }
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }

    .child-view {
        transition: all .25s cubic-bezier(.55, 0, .1, 1);
    }
</style>
