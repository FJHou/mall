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

	if(maxPrice && minPrice) {
		params = {
			salePrice: {
				$gt: +minPrice,
				$lte: +maxPrice
			}
		}
		console.log('maxPrice:' + maxPrice + 'maxPrice:' + maxPrice);
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

module.exports = router;