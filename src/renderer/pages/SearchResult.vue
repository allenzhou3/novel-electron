<template>
    <div class="search">
        <van-list v-model="showQuery" loading="loading">
            <van-cell-group>
                <van-cell v-for="(item,key) in data" @click="goto(item.title,item.url)" :key="key">
                    <div class="item-pic"><img v-lazy="item.imgUrl"></div>
                    <div class="item-info">
                        <h3>{{item.title}}</h3>
                        <p>{{item.author}}</p>
                        <p>{{item.desc}}</p>
                    </div>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "searchResult",
        data() {
            return {
                key: "",
                data: [],
                loading: false,
                showQuery: false
            };
        },
        created() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios({
                        methods: "POST",
                        url: "https://api.steps.info/searchResult",
                        params: {
                            text: this.key||this.$route.params.key
                        }
                    }
                ).then(res => {
                    this.loading = false;
                    if (res.data.result === 1) {
                        this.$set(this, "data", res.data.data);
                        this.showQuery = true;
                    } else {

                    }
                }).catch(err => {
                    this.loading = false;
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
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .search {
        position: relative;
        width: 100vw;
        height: 100vh;
        -webkit-overflow-scrolling: touch;
    }

    .van-list {
        -webkit-overflow-scrolling: touch;
        .item-pic {
            margin-right: px2rem(7.5);
            width: px2rem(60);
            img {
                display: block;
                width: px2rem(60);
                height: auto;
            }
        }
        .item-info {
            width: auto;
            line-height: 1.6;
            h3 {
                font-size: px2rem(15);
                color: #d32f2f;
            }
            p:first-child {
                font-size: px2rem(11);
            }
            p:last-child {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: px2rem(13);
            }
        }
    }

</style>
