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
  // User.findOne({userName: req.body.userName}, (err, doc) => {
  //   if (err) {
  //     res.json({
  //       status: '1',
  //       msg: err.message
  //     })

  //     return
  //   }

  //   if (!doc) {
  //     res.json({
  //       status: '1',
  //       msg: '该用户不存在'     
  //     })

  //     return
  //   }
  // })
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
          name: doc.name
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
module.exports = router;
