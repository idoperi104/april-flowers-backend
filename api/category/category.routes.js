const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getCategories, getCategoryById, addCategory, updateCategory, removeCategory} = require('./category.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getCategories)
router.get('/:id', getCategoryById)
router.post('/', requireAdmin, addCategory)
router.put('/:id', requireAdmin, updateCategory)
router.delete('/:id', requireAdmin, removeCategory)

module.exports = router