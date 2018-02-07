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
  User.findOne({userName: req.body.userName}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })

      return
    }

    if (!doc) {
      res.json({
        status: '1',
        msg: '该用户不存在'     
      })

      return
    }
  })
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
      // res.session.user = doc;
      res.json({
        status: '0',
        msg: 'login success',
        result: {
          userName: doc.userName
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

module.exports = router;
