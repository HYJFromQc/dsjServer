const express = require('express')
const router = express.Router()

const handle = require('../router_hander/artcate')
router.get('/cates', handle.getArtCates)

const joi = require('@escook/express-joi')

const { addcates_schema } = require('../schema/artcate')

router.post('/addcates', joi(addcates_schema), handle.addCates)

const { deletecates_schema } = require('../schema/artcate')
router.get('/deletecate/:id', joi(deletecates_schema), handle.deleteById)

const { getcates_schema } = require('../schema/artcate')
router.get('/cates/:id', joi(getcates_schema), handle.getArtCateById)

const { updatecates_schema } = require('../schema/artcate')
router.post('/updatecate', joi(updatecates_schema), handle.updateCateById)
module.exports = router