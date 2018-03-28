<template>
    <div class="bookInfo">
        <header v-if="!loading">
            <div class="item-pic">
                <img v-bind:src="data.imgUrl" v-bind:alt="data.title" v-bind:title="data.title">
            </div>
            <div class="item-info">
                <h1>{{data.title}}</h1>
                <p class="author">{{data.author}}</p>
                <p class="updatetime">{{data.updatetime}}</p>
                <p class="newchapter">{{data.newchapter}}</p>
                <p class="intro">{{data.intro}}</p>
            </div>
        </header>
        <section v-if="!loading">
            <a v-for="item in data.chapters" @click="goto(item.url)">{{item.title}}</a>
        </section>
        <van-loading color="black" v-if="loading"/>
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
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .bookInfo {
        padding: px2rem(15);
    }

    header {
        display: flex;
        padding-bottom: px2rem(15);
        border-bottom: 1px solid #BCC3CC;
    }

    .item-pic {
        width: 30%;
        img{
            display: block;
            width: 100%;
            height: auto;
        }
    }

    .item-info {
        width: 70%;
        display: flex;
        padding-left: px2rem(15);
        flex-direction: column;
        justify-content: space-between;
        h1 {
            font-size: px2rem(20);
        }
        .author {
            font-size: px2rem(15);
        }
        .updatetime {
            font-size: px2rem(11);
            color: #d32f2f;
        }
        .newchapter {
            color: #d32f2f;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .intro {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    section {
        padding-top: px2rem(15);
        display: flex;
        flex-wrap: wrap;
        a {
            display: block;
            width: 50%;
            height: px2rem(36);
            line-height: px2rem(36);
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
            margin-bottom: px2rem(15);
            width: px2rem(120);
            height: px2rem(160);
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
                font-size: px2rem(18);
            }
        }
        .intro {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: px2rem(15);
            padding-left: px2rem(15);
            width: calc(100% - 120px);
            h2 {
                font-size: px2rem(16);
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
