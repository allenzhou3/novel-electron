<template>
    <div class="index">
        <header>
            <van-search></van-search>
        </header>
        <section>
            <div class="history" v-if="history.length">
                <h2>历史</h2>
                <div class="list">
                    <router-link v-for="(item,key) in history" v-if="key<20"
                                 :to="{name:'searchResult',params:{key:item.bookname}}" :key="key">
                        {{item.bookname}}
                    </router-link>
                </div>
            </div>
            <div class="hot" v-if="hot.length">
                <h2>热门<a @click="changeItem('hot')">换一换</a></h2>
                <div class="list">
                    <router-link v-for="(item,key) in hot" v-if="key<20"
                                 :to="{name:'searchResult',params:{key:item.word}}" :key="key">{{item.word}}
                    </router-link>
                </div>
            </div>
            <div class="rec" v-if="rec.length">
                <h2>推荐<a @click="changeItem('rec')">换一换</a></h2>
                <div class="list">
                    <router-link v-for="(item,key) in rec" v-if="key<20" :to="{name:'searchResult',params:{key:item}}"
                                 :key="key">{{item}}
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                hot: [],
                rec: [],
                history: [],
                loading: false
            };
        },
        created() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios.all([this.getHistory(), this.getHot(), this.getRec()]).then(this.$axios.spread((his, hot, rec) => {
                    if (his.result === 1) {
                        this.$set(this, "history", his.data);
                    }
                    if (hot.data.result === 1) {
                        this.$set(this, "hot", hot.data.data);

                    }
                    if (rec.data.result === 1) {
                        this.$set(this, "rec", rec.data.data);
                    }
                    this.loading = false;
                })).catch(err => {
                    console.log(err)
                    this.loading = false;
                })
            },
            getHistory() {
                return new Promise((resolve, reject) => {
                    resolve(() => {
                        return localStorage.getItem("history") ? {
                            result: 1,
                            data: JSON.parse(localStorage.getItem("history"))
                        } : {
                            result: 0,
                            data: []
                        }
                    });
                });
            },
            getHot() {
                return this.$axios.get("https://api.steps.info/hotSearchWords");
            },
            getRec() {
                return this.$axios.get("https://api.steps.info/searchRecommend")
            },
            changeItem(type) {
                let newData = [].concat(this[type]);
                for (let i = newData.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp = newData[i];
                    newData[i] = newData[j];
                    newData[j] = temp;
                }
                this.$set(this, type, newData);
            },
            goto(title) {
                console.log(title)
                //保存阅读历史
                // let local = localStorage.getItem("history");
                // let his = local ? JSON.parse(local) : [];
                // if (his.indexOf(title) === -1) localStorage.setItem("history", JSON.stringify(his.concat({"bookname": title})));
                //保存当前选择的小说
                // localStorage.setItem("current", JSON.stringify(localStorage.getItem("current") ? Object.assign({}, JSON.parse(localStorage.getItem("current")), {bookname: title}) : {bookname: title}))
                this.$router.push({name: "searchResult", params: {key: title,}})
            }
        }
    };
</script>

<style lang="scss" scoped>

    .index {
        position: relative;
        width: 86vw;
        height: 100vh;
    }

    section {
        padding: 0 15px 15px;
        > div {
            margin-bottom: 15px;
        }
        h2 {
            position: relative;
            margin-bottom: 15px;
            padding-left: 15px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: rgba(69, 90, 100, .6);
            a {
                float: right;
                font-size: 13px;
            }
            &:before {
                position: absolute;
                display: block;
                content: '';
                width: 4px;
                height: 16px;
                background-color: currentColor;
                left: 0;
                top: 50%;
                margin-top: -8px;
            }
            &:after {
                display: block;
                content: '';
                clear: both;
                overflow: hidden;
            }
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            a {
                display: block;
                margin: 0 8px 8px 0;
                padding: 2px 5px;
                background-color: #c9c9c9;
                border-radius: 3px;
                color: #fff;
            }
        }
    }

    .van-search {
        position: relative;
        width: 100%;
        transform: translate3d(0, 0, 0);
        z-index: 9999;
        .van-search__input {
            text-align: center;
        }
    }

    .slide-down-active, .slide-up-active {
        transition: all .25s linear;
    }

    .slide-down {
        transform: translate3d(0, -100%, 0);
    }

    .slide-up {
        transform: translate3d(0, 0, 0);
    }
</style>
