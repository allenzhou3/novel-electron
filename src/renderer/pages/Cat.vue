<template>
    <div class="cat">
        <div v-if="!isEmpty">
            <van-row class="items">
                <header>男生</header>
                <van-col span="6" class="item" v-for="(item,key) in data.male"
                         :key="key">
                    <div @click="goto('male',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </van-col>
            </van-row>
            <van-row class="items">
                <header>女生</header>
                <van-col span="6" class="item" v-for="(item,key) in data.female"
                         :key="key">
                    <div @click="goto('female',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </van-col>
            </van-row>
            <van-row class="items">
                <header>漫画</header>
                <van-col span="6" class="item" v-for="(item,key) in data.picture"
                         :key="key">
                    <div @click="goto('picture',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </van-col>
            </van-row>
            <van-row class="items">
                <header>出版</header>
                <van-col span="6" class="item" v-for="(item,key) in data.press"
                         :key="key">
                    <div @click="goto('press',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </van-col>
            </van-row>
        </div>
        <Empty v-if="isEmpty"></Empty>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script>
    import Loading from "../components/Loading"
    import Empty from "../components/Empty"

    export default {
        name: 'Cat',
        data() {
            return {
                data: {},
                loading: false,
                isEmpty: false
            }
        },
        components: {
            Loading,
            Empty
        },
        created() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios({
                    url: "https://api.steps.info/cat"
                }).then(res => {
                    if (res.data.result === 1) {
                        this.$set(this, "data", res.data.data);
                        this.loading = false;
                    } else {

                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            goto(type = 'male', name = '玄幻') {
                console.log(type, name)
                this.$router.push({name: "catlist", params: {gender: type, mayjor: name}})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .cat {
        padding-bottom: px2rem(15);
        -webkit-overflow-scrolling: touch;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(44);
        font-size: px2rem(14);
        a {
            transition: all .25s;
        }
        a.active {
            color: #3283fa;
            &:after {
                display: block;
                content: '';
                width: 100%;
                height: px2rem(2);
                background-color: #3283fa;
            }
        }
    }

    .items {
        display: flex;
        flex-wrap: wrap;
        padding: 0 px2rem(15);
        header {
            width: 100%;
            padding: px2rem(15) 0;
            font-size: px2rem(14);
            color: #999;
        }
        .item {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: px2rem(15) 0;
            background-color: #39a9ed;
            transition: background .25s linear;
            color: #fff;
            p {
                &:last-child {
                    color: rgba(255, 255, 255, .5);
                }
            }
            &:active {
                background: rgb(242, 242, 242);
            }
        }
    }
</style>
