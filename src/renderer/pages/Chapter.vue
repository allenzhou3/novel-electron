<template>
    <div class="chapter">
        <div class="con">
            <div class="block-title"><h2>Chapter</h2></div>
            <header>
                <h1>{{data.title}}</h1>
                <p>{{data.author}}</p>
            </header>
            <div class="pagination" v-if="!loading">
                <a @click="initPage(data.prev)">上一章</a>
                <router-link :to="{name:'bookinfo',params:{url:data.categories}}">返回目录</router-link>
                <a @click="initPage(data.next)">下一章</a>
            </div>
            <section v-html="data.data" v-if="!loading"></section>
            <div class="pagination" v-if="!loading">
                <a @click="initPage(data.prev)">上一章</a>
                <router-link :to="{name:'bookinfo',params:{url:data.categories}}">返回目录</router-link>
                <a @click="initPage(data.next)">下一章</a>
            </div>
            <van-loading color="black" v-if="loading"/>
        </div>
    </div>
</template>

<script>
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
        created() {
            this.initPage(this.url);
        },
        methods: {
            initPage(url) {
                if (!url) {
                    alert("没有啦");
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
    header {
        margin-bottom: 30px;
        text-align: center;
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 14px;
        }
    }

    .pagination {
        display: flex;
        padding-bottom: 15px;
        justify-content: space-between;
        font-size: 15px;
        border-bottom: 1px solid #f5f5f5;
        a{
            color: #ebbd34;
        }
        &:last-child {
            border-bottom: none;
        }
    }

    section {
        padding: 15px 0;
        font-size: 15px;
        line-height: 2;
    }
</style>
