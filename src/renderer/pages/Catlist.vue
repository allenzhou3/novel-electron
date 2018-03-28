<template>
    <div class="catlist">
        <header>
            <div class="type"><a class="active" @click="changeType('hot',$event)">热门</a><a
                @click="changeType('new',$event)">新书</a><a
                @click="changeType('reputation',$event)">好评</a><a @click="changeType('over',$event)">完结</a></div>
            <div class="minor"><a class="active" @click="changeMinor('',$event)">全部</a><a
                @click="changeMinor('东方玄幻',$event)">东方玄幻</a><a
                @click="changeMinor('异界大陆',$event)">异界大陆</a><a @click="changeMinor('异界争霸',$event)">异界争霸</a><a
                @click="changeMinor('远古神话',$event)">远古神话</a>
            </div>
        </header>
        <section class="items">
            <vue-data-loading :loading="fetching" :completed="completed"
                              :listens="['infinite-scroll', 'pull-up']"
                              :init-scroll="false" @infinite-scroll="infiniteScroll" @pull-up="pullUp">
                <div class="item" v-for="item in data" @click="gotoBook(item.title,item.id)">
                    <div class="itempic"><img v-lazy="item.cover"></div>
                    <div class="itemintro">
                        <h2 class="name">{{item.title}}</h2>
                        <p class="author">{{item.author}}</p>
                        <p class="shortIntro">{{item.shortIntro}}</p>
                        <p class="rate"><span>{{item.latelyFollower}}</span>人气 | <span>{{item.retentionRatio}}</span>读者留存
                        </p>
                    </div>
                </div>
            </vue-data-loading>
            <Loading v-if="loading"></Loading>
        </section>
    </div>
</template>

<script>
    import Loading from "../components/Loading"
    import VueDataLoading from 'vue-data-loading'

    export default {
        name: "catlist",
        data() {
            return {
                data: [],
                type: "hot",
                minor: "",
                start: 0,
                limit: 20,
                loading: false,
                isEmpty: false,
                fetching: false,
                completed: false,
            }
        },
        components: {
            Loading,
            VueDataLoading
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(type = "hot", minor = "东方玄幻", loadMore = false) {
                if (loadMore) {
                    this.fetching = true;
                } else {
                    this.loading = true;
                    this.data = [];
                }
                this.$axios({
                    url: "https://api.steps.info/catDetail",
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    params: {
                        gender: this.$route.params.gender,
                        mayjor: this.$route.params.mayjor,
                        type: type,
                        minor: minor,
                        start: this.start,
                        limit: this.limit
                    }
                }).then(res => {
                    if (res.data.result === 1) {
                        Array.prototype.forEach.call(res.data.data, (v, k) => {
                            v.cover = decodeURIComponent(v.cover.replace(/\/agent\//ig, ""));
                            v.author = `${v.author} | ${v.majorCate}`;
                            v.latelyFollower = `${(v.latelyFollower / 10000).toFixed(2)}万`;
                            v.retentionRatio = `${v.retentionRatio}%`;
                        });
                        if (loadMore) {
                            this.fetching = false;
                            this.$set(this, "data", this.data.concat(res.data.data));
                            if (res.data.data.length === 0) {
                                this.completed = true;
                            }
                        } else {
                            setTimeout(() => {
                                this.loading = false;
                                this.$set(this, "data", res.data.data);
                            }, 1000);
                        }
                    }
                }).catch(err => {

                })
            },
            infiniteScroll() {
                this.start = this.limit;
                this.limit += 20;
                this.fetchData(this.type, this.minor, true);
            },
            pullUp() {
                this.start = this.limit;
                this.limit += 20;
                this.fetchData(this.type, this.minor, true);
            },
            changeType(type = "hot", event) {
                let _type = document.querySelector(".type");
                let typeLinks = _type.querySelectorAll("a");
                Array.prototype.forEach.call(typeLinks, (v, k) => {
                    v.classList.remove("active");
                    event.currentTarget.classList.add("active");
                });
                this.$set(this, "type", type);
                this.$set(this, "start", 0);
                this.$set(this, "limit", 50);
                this.fetchData(type, this.minor);
            },
            changeMinor(minor, event) {
                let _minor = document.querySelector(".minor");
                let minorLinks = _minor.querySelectorAll("a");
                Array.prototype.forEach.call(minorLinks, (v, k) => {
                    v.classList.remove("active");
                    event.currentTarget.classList.add("active");
                });
                this.$set(this, "minor", minor);
                this.$set(this, "start", 0);
                this.$set(this, "limit", 50);
                this.fetchData(this.type, minor);
            },
            gotoBook(title) {
                this.$router.push({name: "searchResult", params: {key: title}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .catlist {
        min-height: 100vh;
        background-color: #eee;
    }

    header {
        background-color: #fff;
        a {
            margin-right: px2rem(15);
            color: #666;
            transition: all .25s linear;
            &.active {
                color: #3283fa;
            }
        }
    }

    .type, .minor {
        height: px2rem(48);
        line-height: px2rem(48);
        padding: 0 px2rem(15);
    }

    .type {
        border-bottom: 1px solid rgb(242, 242, 242);
    }

    .items {
        padding: 0 px2rem(15);
    }

    .item {
        display: flex;
        flex-direction: row;
        padding: px2rem(15) 0;
        border-bottom: 1px solid rgb(220, 220, 220);
        .itempic {
            img {
                display: block;
                width: px2rem(70);
                height: px2rem(100);
            }
        }
        .itemintro {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: px2rem(15);
            flex: auto;
            overflow: hidden;
            .name {
                font-size: px2rem(15);
            }
            .author {
                color: #999;
            }
            .shortIntro {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #999;
            }
            .rate {
                span {
                    color: #3283fa;
                }

            }
        }
    }
</style>
