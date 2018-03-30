<template>
    <section class="search">
        <section class="con">
            <div class="block-title">
                <h2 class="title">Search Result</h2>
            </div>
            <div class="list" v-for="(item,key) in data" :key="key" @click="goto(item.title,item.url)">
                <div class="item-pic"><img v-lazy="item.imgUrl"></div>
                <div class="item-info">
                    <h3>{{item.title}}</h3>
                    <p>{{item.author}}</p>
                    <p>{{item.desc}}</p>
                </div>
            </div>
            <van-loading color="black" v-if="loading"/>
            <div class="empty" v-if="empty">Sorry，没有搜到</div>
        </section>
    </section>
</template>

<script>
    export default {
        name: "searchResult",
        data() {
            return {
                key: '',
                data: [],
                loading: false,
                empty: false
            };
        },
        created() {
            this.$set(this, "key", this.$route.params.key);
            this.initPage();
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios({
                        methods: "POST",
                        url: "https://api.steps.info/searchResult",
                        params: {
                            text: this.key
                        }
                    }
                ).then(res => {
                    this.loading = false;
                    if (res.data.result === 1) {
                        if (res.data.data.length === 0) {
                            this.empty = true;
                        } else {
                            this.$set(this, "data", res.data.data);
                        }
                    } else {
                        this.empty = true;
                    }
                }).catch(err => {
                    this.loading = false;
                    this.empty = true;
                })
            },
            goto(title, url) {
                //保存阅读历史
                // let local = localStorage.getItem("history");
                // let his = local ? JSON.parse(local) : [];
                // if (his.indexOf(title) === -1) localStorage.setItem("history", JSON.stringify(his.concat({"bookname": title})));
                //保存当前选择的小说
                // localStorage.setItem("current", JSON.stringify(localStorage.getItem("current") ? Object.assign({}, JSON.parse(localStorage.getItem("current")), {bookname: title}) : {bookname: title}))
                this.$router.push({name: "bookinfo", params: {bookname: title, url: url}})
            }
        }
    };
</script>

<style lang="scss" scoped>
    .con {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .block-title {
        margin-bottom: 45px;
        width: 100%;
    }

    .list {
        display: flex;
        margin-bottom: 15px;
        padding: 15px;
        background-color: #fff;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        width: 47.5%;
        &:nth-of-type(2n) {
            margin-right: 0;
        }
        .item-pic {
            margin-right: 15px;
            width: 60px;
            img {
                display: block;
                width: 60px;
                height: auto;
            }
        }
        .item-info {
            width: auto;
            line-height: 1.6;
            h3 {
                font-size: 15px;
                color: #d32f2f;
            }
            p:first-child {
                font-size: 11px;
            }
            p:last-child {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 13px;
            }
        }
    }
</style>
