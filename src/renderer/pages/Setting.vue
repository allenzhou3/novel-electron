<template>
    <div class="setting">
        <div class="con">
            <h2 class="title">设置</h2>
            <h1>{{ msg }}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Setting',
        data() {
            return {
                msg: 'Coming Soon'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .con{
        position: relative;
        padding: 0 15px;
        min-height: 100vh;
        background-color: #fff;
        .title {
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
</style>
