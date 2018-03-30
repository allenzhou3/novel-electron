<template>
    <div class="cat">
        <div class="con">
            <div class="block-title">
                <h2 class="title">Catgories</h2>
            </div>
            <div class="items">
                <header class="block-title"><h3>男生</h3></header>
                <div class="item" v-for="(item,key) in data.male"
                     :key="key">
                    <div @click="goto('male',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </div>
            </div>
            <div class="items">
                <header class="block-title"><h3>女生</h3></header>
                <div class="item" v-for="(item,key) in data.female"
                     :key="key">
                    <div @click="goto('female',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </div>
            </div>
            <div class="items">
                <header class="block-title"><h3>漫画</h3></header>
                <div class="item" v-for="(item,key) in data.picture"
                     :key="key">
                    <div @click="goto('picture',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </div>
            </div>
            <div class="items">
                <header class="block-title"><h3>出版</h3></header>
                <div class="item" v-for="(item,key) in data.press"
                     :key="key">
                    <div @click="goto('press',item.name)"><p>{{item.name}}</p>
                        <p>{{item.bookCount+"本"}}</p></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cat',
        data() {
            return {
                data: {}
            }
        },
        created() {
            this.initPage();
        },
        methods: {
            initPage() {
                // this.loading = true;
                this.$axios({
                    url: "https://api.steps.info/cat"
                }).then(res => {
                    if (res.data.result === 1) {
                        this.$set(this, "data", res.data.data);
                        // this.loading = false;
                    } else {

                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            goto(type = 'male', name = '玄幻') {
                this.$router.push({name: "catlist", params: {gender: type, mayjor: name}})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .block-title {
        margin-bottom: 30px;
        h3 {
            display: inline-block;
            /*margin: 0 0 15px;*/
            padding-bottom: 3px;
            font-size: 15px;
            &:after {
                display: block;
                content: '';
                width: 100%;
                height: 2px;
                margin-top: -1px;
                background-color: #ffcd38;
            }
        }
    }

    .items {
        margin-bottom: 30px;
        &:after {
            display: block;
            content: '';
            clear: both;
        }
    }

    .item {
        float: left;
        display: flex;
        margin: 0 1.6% 15px 0;
        padding: 15px 0;
        border: 2px solid #ffcd38;
        transition: background .25s linear;
        color: #222;
        width: 23.8%;
        justify-content: center;
        align-items: center;
        &:nth-of-type(4n) {
            margin-right: 0;
        }
        p {
            &:last-child {
                color: rgba(34, 34, 34, .5);
            }
        }
    }

</style>
