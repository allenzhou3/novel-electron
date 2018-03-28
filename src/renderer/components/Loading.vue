<template>
    <div class="loading">
        <div class="spinner"></div>
    </div>
</template>

<script>
    export default {
        name: "loadingCom"
    }
</script>

<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .loading {
        position: fixed;
        display: flex;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: transparent;
        z-index: 99;
        justify-content: center;
        align-items: center;
    }

    .spinner {
        width: px2rem(20);
        height: px2rem(20);
        background-color: rgb(252, 73, 103);
        -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
        animation: sk-rotateplane 1.2s infinite ease-in-out;
    }

    @-webkit-keyframes sk-rotateplane {
        0% {
            -webkit-transform: perspective(px2rem(60))
        }
        50% {
            -webkit-transform: perspective(px2rem(60)) rotateY(180deg)
        }
        100% {
            -webkit-transform: perspective(px2rem(60)) rotateY(180deg) rotateX(180deg)
        }
    }

    @keyframes sk-rotateplane {
        0% {
            transform: perspective(px2rem(60)) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(px2rem(60)) rotateX(0deg) rotateY(0deg)
        }
        50% {
            transform: perspective(px2rem(60)) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(px2rem(60)) rotateX(-180.1deg) rotateY(0deg)
        }
        100% {
            transform: perspective(px2rem(60)) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(px2rem(60)) rotateX(-180deg) rotateY(-179.9deg);
        }
    }

</style>
