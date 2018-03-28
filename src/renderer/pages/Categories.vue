<template>
    <div class="catgories">
        <header>
            <h2>{{bookinfo.title}}</h2>
            <p>{{bookinfo.auth}}</p>
        </header>
        <section>
            <router-link v-for="(item,key) in data"
                         :to="{name:'chapter',params:{bookinfo:bookinfo,index:key,chapters:data,url:item.url,prev:item.prev,next:item.next}}"
                         :key="key" @click.native="goChapter(key)">
                {{item.title}}
            </router-link>
        </section>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script>
    import Loading from "../components/Loading"

    export default {
        name: 'Categories',
        data() {
            return {
                loading: false,
                bookinfo: this.$route.params.bookinfo,
                data: []
            }
        },
        components: {
            Loading
        },
        created() {
            this.initPage();
        },
        methods: {
            initPage() {
                this.loading = true;
                this.$axios.get(`https://novel.nightc.com/v1/novel/${this.bookinfo.id}/chapters`).then(res => {
                    console.log(res.data.code)
                    this.loading = false;
                    if (res.data.code === 0) {
                        let len = res.data.data.length;
                        let arr = res.data.data;
                        Array.prototype.forEach.call(arr, (v, k) => {
                            console.log(v, "arr");
                            if (k === 0) {
                                v.prev = '';
                                v.next = arr[k + 1].url;
                            } else if (k === len - 1) {
                                v.prev = arr[k - 1].url;
                                v.next = ''
                            } else {
                                v.prev = arr[k - 1].url;
                                v.next = arr[k + 1].url;
                            }
                            v = Object.assign({}, v, {
                                prev: v.prev,
                                next: v.next
                            });
                            console.log(v)
                        });
                        this.$set(this, "data", arr)
                    }
                }).catch(err => {
                    this.loading = false;
                    console.log(err)
                })
            },
            goChapter(key) {
                localStorage.setItem("current", JSON.stringify(Object.assign({}, JSON.parse(localStorage.getItem("current")), this.data[key])))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @function px2rem($px) {
        @return $px / 100 * 1rem;
    }

    .catgories {
        padding: px2rem(15);
        header {
            padding-bottom: px2rem(60);
            text-align: center;
            h2 {
                font-size: px2rem(24);
            }
            p {
                font-size: px2rem(14);
            }
        }
        section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            a {
                display: block;
                margin-bottom: px2rem(15);
                width: 50%;
            }
        }
    }
</style>
