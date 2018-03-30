<template>
    <div class="bookInfo">
        <div class="con">
            <div class="block-title"><h2 class="title">BookInfo</h2></div>
            <header v-if="!loading">
                <div class="item-pic">
                    <img v-bind:src="data.imgUrl" v-bind:alt="data.title" v-bind:title="data.title">
                </div>
                <div class="item-info">
                    <div class="desc">
                        <h1>{{data.title}}</h1>
                        <p class="author">{{data.author}}</p>
                        <p class="updatetime">{{data.updatetime}}</p>
                        <p class="newchapter">{{data.newchapter}}</p>
                    </div>
                    <p class="intro">{{data.intro}}</p>
                </div>
            </header>
            <section v-if="!loading">
                <a v-for="item in data.chapters" @click="goto(item.url)">{{item.title}}</a>
            </section>
            <van-loading color="black" v-if="loading"/>
        </div>
    </div>
</template>

<script>
    import Loading from "../components/Loading";

    export default {
        name: "bookInfo",
        data() {
            return {
                loading: false,
                url: this.$route.params.url,
                data: {}
            }
        },
        components: {
            Loading
        },
        created() {
            this.initPage()
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios({
                    methods: "POST",
                    url: "https://api.steps.info/bookInfo",
                    params: {
                        url: this.url
                    }
                }).then(res => {
                    this.loading = false;
                    if (res.data.result === 1) {
                        this.$set(this, "data", res.data.data)
                    } else {

                    }
                }).catch(err => {
                    this.loading = false;
                    console.log(err)
                })
            },
            goto(url) {
                this.$router.push({name: "chapter", params: {url: url}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        padding-top: 60px;
        padding-bottom: 15px;
        border-bottom: 1px solid #f5f5f5;
    }

    .item-pic {
        width: 200px;
        img {
            display: block;
            width: 200px;
            height: auto;
        }
    }

    .item-info {
        display: flex;
        padding-left: 15px;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1.6;
        h1 {
            font-size: 20px;
        }
        .author {
            font-size: 15px;
        }
        .updatetime {
            font-size: 11px;
            color: #d32f2f;
        }
        .newchapter {
            color: #d32f2f;
        }
    }

    section {
        padding-top: 15px;
        display: flex;
        flex-wrap: wrap;
        a {
            display: block;
            width: 33.333333%;
            height: 36px;
            line-height: 36px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .item {
        padding: px2rem(15);
        display: flex;
        flex-wrap: wrap;
        .cover {
            margin-bottom: 15px;
            width: 120px;
            height: 160px;
            img {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
            }
            img:before {
                content: "暂无封面";
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                writing-mode: vertical-lr;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgb(220, 220, 220);
                font-size: 18px;
            }
        }
        .intro {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-left: 15px;
            width: calc(100% - 120px);
            h2 {
                font-size: 16px;
                color: #333;
            }
            span {
                color: #3283fa;
            }
        }
        .shortinfo {
            display: -webkit-box;
            width: 100%;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
    }
</style>
