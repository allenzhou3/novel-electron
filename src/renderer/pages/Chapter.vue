<template>
    <div class="chapter">
        <nav v-if="!loading">
            <a @click="initPage(data.prev)">上一章</a>
            <router-link :to="{name:'bookinfo',params:{url:data.categories}}">返回目录</router-link>
            <a @click="initPage(data.next)">下一章</a>
        </nav>
        <section v-html="data.data" v-if="!loading"></section>
        <nav v-if="!loading">
            <a @click="initPage(data.prev)">上一章</a>
            <router-link :to="{name:'bookinfo',params:{url:data.categories}}">返回目录</router-link>
            <a @click="initPage(data.next)">下一章</a>
        </nav>
        <van-loading color="black" v-if="loading"/>
    </div>
</template>

<script>
    import Loading from "../components/Loading";
    import {Bus} from "../bus"
    export default {
        name: 'Chapter',
        data() {
            return {
                url: this.$route.params.url,
                data: {},
                loading: false
            }
        },
        components: {
            Loading
        },
        created() {
            this.initPage(this.url);
        },
        methods: {
            initPage(url) {
                if (!url) {
                    Toast("没有啦");
                    return false;
                }
                this.loading = true;
                this.$axios({
                    methods: "POST",
                    url: "https://api.steps.info/chapter",
                    params: {
                        url: url
                    }
                }).then(res => {
                    if (res.data.result === 1) {
                        this.$set(this, "data", res.data);
                        this.loading = false;
                        Bus.$emit('title', res.data.title)
                    }
                }).catch(err => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .chapter {
        padding: px2rem(15);
        header {
            padding-bottom: px2rem(15);
            text-align: center;
            h2 {
                font-size: px2rem(24);
            }
            p {
                font-size: px2rem(14);
            }
        }
        nav {
            display: flex;
            padding-bottom: px2rem(15);
            justify-content: space-between;
            font-size: px2rem(15);
            border-bottom: 1px solid #BCC3CC;
            &:last-child {
                border-bottom: none;
            }
        }
        section {
            padding: px2rem(15) 0;
            font-size: px2rem(15);
        }
    }
</style>
