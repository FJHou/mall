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
      'salePrice': String,
      'productImage': String,
      'checked': Boolean,
      'productCount': String
    }
  ],
  'addressList': Array
})

module.exports = mongoose.model('User', userSchema)