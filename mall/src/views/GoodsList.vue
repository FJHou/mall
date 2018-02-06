<template>
    <div>
      <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link"></span>
              <a href="javascript:void(0)" class="navbar-link" @click="loginModal">Login</a>
              <a href="javascript:void(0)" class="navbar-link">Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                <a class="navbar-link navbar-cart-link" href="/#/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" :class="modalShow ? 'md-show' : ''">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="closeModal">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" 
                          tabindex="1" 
                          name="loginname" 
                          class="regi_login_input"
                          v-model="userName">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" 
                          tabindex="2" 
                          name="password" 
                          class="regi_login_input" 
                          v-model="userPwd">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="modalShow"></div>
      </header>
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
      <footer class="footer">
        <div class="footer__wrap">
          <div class="footer__secondary">
            <div class="footer__inner">
              <div class="footer__region">
                <span>Region</span>
                <select class="footer__region__select">
                  <option value="en-US">USA</option>
                  <option value="zh-CN">China</option>
                  <option value="in">India</option>
                </select>
              </div>
              <div class="footer__secondary__nav">
                <span>Copyright © 2017 IMooc All Rights Reserved.</span>
                <a href="http://us.lemall.com/us/aboutUs.html">
                  About Us
                </a>
                <a href="http://us.lemall.com/us/termsofUse.html">
                  Terms &amp; Conditions
                </a>
                <a href="http://us.lemall.com/us/privacyPolicy.html">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>
<script>
  import './../assets/css/login.css'
  import axios from 'axios'

  export default{
    data(){
      return {
        userName: '',
        userPwd: '',
        modalShow: false,
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
    methods: {
      login () {
        axios.post('/apis/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })       
      },
      loginModal () {
        this.modalShow = true
      },
      closeModal () {
        this.modalShow = false
      },
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
