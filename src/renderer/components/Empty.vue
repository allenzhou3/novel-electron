<template>
    <div class="empty">
        <img src="../assets/img/empty.jpg" alt="">
        <p>暂无数据</p>
        <p>网络错误</p>
    </div>
</template>

<script>
    export default {
        name: "empty",
        data() {
            return {
                title: "首页",
                name: 'index'
            }
        },
        props: {},
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .empty {
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: #fff;
        font-size: px2rem(24);
        color: #333;
        img {
            display: block;
            margin-bottom: px2rem(30);
            width: 100%;
            height: auto;
        }
    }
</style>
