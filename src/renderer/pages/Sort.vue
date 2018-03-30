<template>
    <div class="sort">
        <div class="con">
            <h2 class="title">排行榜</h2>
            <header>
                <div class="type">
                    <a class="active" @click="changeType('male')">男生</a>
                    <a @click="changeType('female')">女生</a>
                </div>

                <div class="sortType">
                    <a class="active" @click="changeSortType('hot')">最热榜</a>
                    <a @click="changeSortType('best')">好评榜</a>
                    <a @click="changeSortType('hotsearch')">热搜榜</a>
                    <a @click="changeSortType('potential')">潜力榜</a>
                    <a @click="changeSortType('keep')">留存榜</a>
                    <a @click="changeSortType('finish')">完结榜</a>
                </div>
            </header>
            <section>
                <div class="item" v-for="item in data" @click="goto(item.title)">
                    <div class="itempic">
                        <img v-lazy="item.cover">
                    </div>
                    <div class="itemintro">
                        <h2 class="name">{{item.title}}</h2>
                        <p class="item-author">{{item.author}}</p>
                        <p class="shortIntro">{{item.shortIntro}}</p>
                        <p class="rate"><span>{{item.latelyFollower}}</span>人气 | <span>{{item.retentionRatio}}</span>读者留存</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'sort',
        data() {
            return {
                type: 'male',
                sortType: 'hot',
                data: []
            }
        },
        created() {
            this.initPage(this.type, this.sortType);
        },
        computed: {
            id() {
                if (this.type === 'male') {
                    switch (this.sortType) {
                        case "hot":
                            return "54d42d92321052167dfb75e3";
                        case "best":
                            return "5a6844aafc84c2b8efaa6b6e";
                        case "hotsearch":
                            return "5a6844f8fc84c2b8efaa8bc5";
                        case "potential":
                            return "54d42e72d9de23382e6877fb";
                        case "keep":
                            return "564547c694f1c6a144ec979b";
                        case "finish":
                            return "564eb878efe5b8e745508fde";
                    }
                } else {
                    switch (this.sortType) {
                        case "hot":
                            return "54d43437d47d13ff21cad58b";
                        case "best":
                            return "5a684551fc84c2b8efaab179";
                        case "hotsearch":
                            return "5a684515fc84c2b8efaa9875";
                        case "potential":
                            return "54d43709fd6ec9ae04184aa5";
                        case "keep":
                            return "5645482405b052fe70aeb1b5";
                        case "finish":
                            return "564eb8a9cf77e9b25056162d";
                    }
                }
            }
        },
        methods: {
            initPage() {
                this.$axios({
                    methods: "POST",
                    url: "https://api.steps.info/sort",
                    params: {
                        id: this.id
                    }
                }).then((res) => {
                    if (res.data.result === 1) {
                        let data = [];
                        Array.prototype.forEach.call(res.data.data, (v, k) => {
                            data.push(Object.assign({}, v, {cover: decodeURIComponent(v.cover.replace(/\/agent\//ig, ""))}))
                        });
                        this.$set(this, "data", data)
                    } else {
                        console.log(res)
                    }
                })

            },
            changeType(type) {
                let _type = document.querySelector(".type");
                let typeLinks = _type.querySelectorAll("a");
                Array.prototype.forEach.call(typeLinks, (v, k) => {
                    v.classList.remove("active");
                    event.currentTarget.classList.add("active");
                });
                this.type = type;
                this.initPage()
            },
            changeSortType(sortType) {
                let _sortType = document.querySelector(".sortType");
                let sortTypeLinks = _sortType.querySelectorAll("a");
                Array.prototype.forEach.call(sortTypeLinks, (v, k) => {
                    v.classList.remove("active");
                    event.currentTarget.classList.add("active");
                });
                this.sortType = sortType;
                this.initPage()
            },
            goto(title){
                this.$router.push({name:"searchResult",params:{key:title}})
            }
        }
    }
</script>

<style lang="scss" scoped>

    .sort {
        position: relative;
        width: 100vw;
        height: 100vh;
        .con{
            position: relative;
            padding: 0 15px;
            min-height: 100vh;
            background-color: #fff;
        }
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

    header {
        background-color: #fff;
        a {
            margin-right: 15px;
            color: #666;
            transition: all .25s linear;
            &.active {
                color: #3283fa;
            }
        }
    }

    .type, .sortType {
        height: 48px;
        line-height: 48px;
        padding: 0 15px;
    }

    .type {
        border-bottom: 1px solid rgb(242, 242, 242);
    }

    section {
        padding: 0 15px;
    }

    .item {
        display: flex;
        flex-direction: row;
        padding: 15px 0;
        border-bottom: 1px solid rgb(220, 220, 220);
        .itempic {
            img {
                display: block;
                width: 70px;
                height: 100px;
            }
        }
        .itemintro {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 15px;
            flex: auto;
            overflow: hidden;
            .name {
                font-size: 15px;
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
