<template>
    <div>
      <Navbar></Navbar>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>Goods</span>
          </nav>
        </div>
      </div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="goodSort">Price <svg class="icon icon-arrow-short" style="color: #333"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd v-for="range in priceFilterGroup" :key="range" @click="filterGoodsByPriceRange(range)">
                    <a href="javascript:void(0)">{{range}}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="good in goodsList" :key="good._id" :data-id="good._id">
                    <div class="pic">
                      <a href="#"><img :src="'/static/' + good.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{good.productName}}</div>
                      <div class="price">{{good.salePrice}}元</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(good.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" 
                      infinite-scroll-disabled="busy" 
                      infinite-scroll-distance="50">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navfooter></Navfooter>
    </div>
</template>
<script>
  import Navbar from '@/components/Navbar'
  import Navfooter from '@/components/Navfooter'
  import axios from 'axios'

  export default{
    data(){
      return {
        priceFilterGroup: [
          'All',
          '0 - 100',
          '100 - 500',
          '500 - 1000',
          '1000 - 2000'
        ],
        currentPage: 1,
        pageSize: 50,
        sort: false,
        goodsList: [],
        busy: false,
        minPrice: '',
        maxPrice: ''
      }
    },
    created () {
      this.getGoodList()
    },
    components: {
      Navbar,
      Navfooter
    },
    methods: {
      addCart (productId) {
        axios.post('/apis/goods/addCart', {
          productId: productId
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      loadMore () {
        // this.busy = true;

        // setTimeout(() => {
        //   this.currentPage++
        //   this.getGoodList(true)
        //   this.busy = false;
        // }, 1000);
      },
      filterGoodsByPriceRange (priceRange) {
        let price = priceRange.match(/\d+/g) || ['', '']
        this.minPrice = price[0]
        this.maxPrice = price[1]
        this.currentPage = 1
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
          sort: this.sort ? 1 : -1,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        }
        axios.get('/apis/goods', {
          params: params
        }).then((res) => {
          console.log(res)
          if (res.data.status === '200') {
            console.log(res.data.result.list)
            this.goodsList = res.data.result.list
          }
        }).catch((err) => {

        })        
      },
      getGoodList (flag) {
        let params = {
          page: this.currentPage,
          pageSize: this.pageSize,
          sort: this.sort ? 1 : -1,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        }
        axios.get('/apis/goods', {
          params: params
        }).then((res) => {
          if (res.data.status === '200') {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.data.result.list)
              if (res.data.result.count === 0 || res.data.result.count < 8) {
                this.busy = true
                console.log(this.busy)
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.data.result.list
            }
          }
        }).catch((err) => {

        })
      },
      goodSort () {
        this.sort = !this.sort
      }
    },
    watch: {
      sort () {
        this.currentPage = 1
        this.busy = false
        this.getGoodList()
      }
    }
  }
</script>
