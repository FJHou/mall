const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'userId': String,
  'userNmae': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      'productId': String,
      'productName': String,
      'salePrice': Number,
      'productImage': String,
      'checked': Boolean,
      'productNum': Number
    }
  ],
  'addressList': Array
})

module.exports = mongoose.model('User', userSchema)