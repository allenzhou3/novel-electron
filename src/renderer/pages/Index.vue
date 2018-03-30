<template>
    <div class="index">
        <div class="con">
            <div class="block-title"><h2 class="title">Home</h2></div>
            <div class="search">
                <h1>搜小说-拒绝广告</h1>
                <input ref="search" type="text" v-model="key" @focus="key=''" placeholder="请输入小说名称/作者">
            </div>
            <van-row gutter="60">
                <van-col span="12">
                    <div class="hot" v-if="hot.length">
                        <h2 class="rol-title">热门<a @click="changeItem('hot')">换一换</a></h2>
                        <div class="list">
                            <span v-for="(item,key) in hot" v-if="key<=30" @click="goto(item.word)" :key="key">{{item.word}}
                            </span>
                        </div>
                    </div>
                </van-col>
                <van-col span="12">
                    <div class="rec" v-if="rec.length">
                        <h2 class="rol-title">推荐<a @click="changeItem('rec')">换一换</a></h2>
                        <div class="list">
                            <span v-for="(item,key) in rec" @click="goto(item)" :key="key">{{item}}</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                key: '',
                hot: [],
                rec: [],
                history: [],
                loading: false
            };
        },
        created() {
            this.initPage();
        },
        mounted() {
            this.$refs.search.addEventListener("keydown", (e) => {
                if (e.keyCode === 13) {
                    this.goto(this.key)
                }
            })
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
            storeKey(key) {
                let local = localStorage.getItem("history");
                let his = local ? JSON.parse(local) : [];
                if (!his.includes(key)) localStorage.setItem("history", JSON.stringify(his.concat(key)));
                this.$router.push({name: "searchResult", params: {key: key}})
            },
            goto(key) {
                if (key) {
                    this.storeKey(key);
                    this.$router.push({name: "searchResult", params: {key: key}})
                }
            }
        }
    };
</script>

<style lang="scss" scoped>


    .rol-title {
        position: relative;
        margin-bottom: 15px;
        padding-left: 15px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #222;
        a {
            float: right;
            font-size: 11px;
            color: rgba(69, 90, 100, .6);
        }
        &:before {
            position: absolute;
            display: block;
            content: '';
            width: 4px;
            height: 16px;
            background-color: #ebbd34;
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
        span {
            display: block;
            margin: 0 8px 8px 0;
            padding: 2px 5px;
            background-color: #9bd952;
            border-radius: 3px;
            color: #fff;
        }
    }

    .search {
        margin-top: 45px;
        margin-bottom: 30px;
        h1 {
            margin-bottom: 15px;
            font-size: 36px;
            text-align: center;
        }
        input {
            display: block;
            padding: 10px 20px;
            width: 100%;
            height: 48px;
            line-height: 24px;
            border: none;
            border-radius: 5px;
            text-align: center;
            background-color: #f5f5f5;
        }
    }
</style>
