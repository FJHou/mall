const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('../models/goods')

mongoose.connect('mongodb://39.106.119.178:27017/mall')

mongoose.connection.on('connected', () => {
	console.log('mongodb connected success')
})

mongoose.connection.on('error', () => {
	console.log('mongodb connected error')
})

mongoose.connection.on('disconnected', () => {
	console.log('mo ngodb disconnected')
})

router.get('/', (req, res, next) => {
	let page = parseInt(req.param('page'))
	let pageSize = parseInt(req.param('pageSize'))
	let minPrice = req.param('minPrice')
	let maxPrice = req.param('maxPrice')
	let sort = req.param('sort')
	let skip = (page - 1) * pageSize
	let params = {}

	if(maxPrice || minPrice) {
		params = {
			salePrice: {
				$gt: +minPrice,
				$lte: +maxPrice
			}
		}
	}

	let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
	goodsModel.sort({'salePrice':sort})
	goodsModel.exec((err, doc) => {
		if (err) {
			res.json({
				status: '400',
				msg: err.message
			})
		} else {
			res.json({
				status: '200',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

router.post('/addCart', (req, res, next) => {
	let userId = '100000077'
	let productId = req.body.productId
	const User = require('../models/users')

	User.findOne({userId: userId}, (err, userDoc) => {
		if (err) {
			res.json({
				status: '1',
				msg: err.message
			})

			return
		}

		if (userDoc) {
			Goods.findOne({productId: productId}, (goodsErr, goodsDoc) => {
				if (goodsErr) {
					res.json({
						status: '1',
						msg: goodsErr.message
					});

					return;
				}

				if (goodsDoc) {
					
					
					let ExistIndex = 0;
					let isCartExist = userDoc.cartList.some((item, index) => {
						ExistIndex = index
						return item.productId === goodsDoc.productId
					})
					if (isCartExist) {
						userDoc.cartList[ExistIndex].productNum++
					} else {
						goodsDoc.productNum = 1;
						goodsDoc.checked = true;
						userDoc.cartList.push(goodsDoc);
					}
					
					userDoc.save((saveErr, saveDoc) => {
						if (saveErr) {
							res.json({
								status: '1',
								msg: saveErr.message
							});

							return						
						}

						res.json({
							status: '1',
							msg: 'add success'						
						})
					})
				}
			})
		}
	})
})

module.exports = router;