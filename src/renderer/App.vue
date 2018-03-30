<template>
    <div id="app">
        <nav>
            <div class="avatar">
                <img src="./assets/img/logo.png" alt="">
                <h1>招总伪程序员</h1>
                <p>Wed Developer</p>
            </div>
            <router-link :to="{name:'index'}"><span></span><span>首页</span></router-link>
            <router-link :to="{name:'cat'}"><span></span><span>分类</span></router-link>
            <router-link :to="{name:'sort'}"><span></span><span>排行榜</span></router-link>
            <!--<router-link :to="{name:'catlist'}"><span></span><span>书城</span></router-link>-->
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

<style lang="scss">
    /*reset*/
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    // HTML5 display-role reset for older browsers
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol, ul {
        list-style: none;
    }

    button {
        border: none;
    }

    a, img, button, input, select {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: 0;
    }

    html {
        font-size: 100px;
        box-sizing: border-box;
    }

    html *, html *:after, html *:before {
        box-sizing: inherit;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        line-height: 1.5;
        font-size: .13rem;
        -webkit-text-size-adjust: 100%;
        -webkit-user-select: none;
        user-select: none;
        -webkit-overflow-scrolling: touch;
        background-color: rgb(248, 248, 248);
    }

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #BCC3CC;
        font-size: 13px;
        text-align: center;
    }

    .van-loading{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -15px;
        margin-left: -15px;
    }
    #app {
        position: relative;
        width: 100%;
        min-height: 100vh;
        -webkit-overflow-scrolling: touch;
    }

    nav {
        position: fixed;
        padding: 15px;
        width: 22%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        background: #fff;
        text-align: center;
        .avatar {
            margin-bottom: 15px;
            padding: 15px;
            img {
                display: block;
                margin: 0 auto;
                width: 100%;
                height: auto;
                border-radius: 50%;
            }
            h1 {
                margin: 20px 0 10px;
                font-size: 20px;
            }
            p {
                font-size: 12px;
                opacity: 0.35;
            }
        }
        a {
            display: block;
            text-align: center;
            padding: 10px 20px;
            color: #222;
            font-size: 15px;
            font-weight: 500;
            position: relative;
            border-bottom: 1px solid #f5f5f5;
            outline: none;
            &:nth-of-type(1) {
                border-top: 1px solid #f5f5f5;
            }
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
        margin-left: 22%;
        padding-left: 15px;
        min-height: 100vh;
        transition: all .25s cubic-bezier(.55, 0, .1, 1);
        background-color: #f5f5f5;
    }

    .block-title{
        h2 {
            display: inline-block;
            position: relative;
            margin: 15px 0 0 -25px;
            padding: 10px 20px 10px 78px;
            background-color: #ffcd38;
            color: #fff;
            line-height: 1.1em;
            font-weight: 500;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
            &:after {
                display: block;
                content: '';
                width: 10px;
                height: 10px;
                position: absolute;
                left: 0;
                bottom: -10px;
                border-bottom: 10px solid transparent;
                border-right: 10px solid #ebbd34;
            }
        }
    }
    .con {
        position: relative;
        padding: 0 15px;
        min-height: 100vh;
        background-color: #fff;
    }
</style>
