const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  'userId': String,
  'userName': String,
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
  'addressList': [
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
})

module.exports = mongoose.model('User', userSchema)