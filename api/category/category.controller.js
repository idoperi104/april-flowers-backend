const categoryService = require('./category.service.js')

const logger = require('../../services/logger.service.js')

async function getCategories(req, res) {
  try {
    logger.debug('Getting Category')
    const filterBy = {
      txt: req.query.txt || ''
    }
    const categories = await categoryService.query(filterBy)
    res.json(categories)
  } catch (err) {
    logger.error('Failed to get categories', err)
    res.status(500).send({ err: 'Failed to get categories' })
  }
}

async function getCategoryById(req, res) {
  try {
    const categoryId = req.params.id
    const category = await categoryService.getById(categoryId)
    res.json(category)
  } catch (err) {
    logger.error('Failed to get category', err)
    res.status(500).send({ err: 'Failed to get category' })
  }
}

async function addCategory(req, res) {
  try {
    const category = req.body
    const addedCategory = await categoryService.add(category)
    res.json(addedCategory)
  } catch (err) {
    logger.error('Failed to add category', err)
    res.status(500).send({ err: 'Failed to add category' })
  }
}


async function updateCategory(req, res) {
  try {
    const category = req.body
    const updatedCategory = await categoryService.update(category)
    res.json(updatedCategory)
  } catch (err) {
    logger.error('Failed to update category', err)
    res.status(500).send({ err: 'Failed to update category' })

  }
}

async function removeCategory(req, res) {
  try {
    const categoryId = req.params.id
    const removedId = await categoryService.remove(categoryId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove category', err)
    res.status(500).send({ err: 'Failed to remove category' })
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  removeCategory,
}
