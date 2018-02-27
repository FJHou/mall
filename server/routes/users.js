var express = require('express');
var router = express.Router();
const User = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })

      return
    }
    if (doc) {
      res.cookie('userId', doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json({
        status: '0',
        msg: 'login success',
        result: {
          name: doc.userName
        }
      });
    } else {
      res.json({
        status: '400',
        msg: '用户名或密码错误'
      })
    }
  })
})

// 登出
router.post('/logout', (req, res, next) => {
  res.cookie('userId', "",{
    path: '/',
    maxAge: -1
  })

  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})


router.post('/getCartList', (req, res, next) => {
  let params = {
    userId: req.body.userId
  }
  User.findOne(params, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })

      return
    }
    if (doc) {
      res.json({
        status: '0',
        msg: '购物车列表查询成功',
        result: doc.cartList
      })
    }
  })
})

router.post('/delGoods', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  User.update({
      userId: userId
    }, 
    // $pull 删除mongodb里的元素
    {
      $pull: {
        'cartList': {
          'productId': productId
        }
      }
    },
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
  
        return
      }
      if (doc) {
        res.json({
          status: '0',
          msg: '删除成功'
        })
      }
    }
  )
})

router.post('/addressList', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })

      return      
    }

    if (doc) {
      res.json({
        status: '0',
        msg: '地址列表查询成功',
        result: {
          addressList: doc.addressList
        }
      })
    }
  })
})

router.post('/addressSetDefault', (req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  // console.log(addressId)
  User.findOne(
    {
      userId: userId
    }, 
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })

        return      
      }

      if (doc) {
        let addressList = doc.addressList.map((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }

          return item
        })
        doc.save((err1, doc1) => {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            }) 
          } else {
            res.json({
              status: '0',
              msg: '设置成功',
              result: addressList
            })
          }
        })
     
      } 
    }
  )
})


router.post('/addressDel', (req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  // console.log(addressId)
  User.update(
    {
      userId: userId
    }, 
    {
      $pull:{
        'addressList': {
          'addressId': addressId
        }
      } 
    },
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })

        return      
      }

      if (doc) {
        res.json({
          status: '0',
          msg: '删除成功'
        })      
      } 
    }
  )
})



module.exports = router;
