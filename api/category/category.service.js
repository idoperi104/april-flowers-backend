const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const utilService = require("../../services/util.service")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy = { txt: "" }) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection("category")
    var categories = await collection.find(criteria).toArray()
    return categories
  } catch (err) {
    logger.error("cannot find categories", err)
    throw err
  }
}

async function getById(categoryId) {
  try {
    const collection = await dbService.getCollection("category")
    const category = collection.findOne({ _id: ObjectId(categoryId) })
    return category
  } catch (err) {
    logger.error(`while finding category ${categoryId}`, err)
    throw err
  }
}

async function remove(categoryId) {
  try {
    const collection = await dbService.getCollection("category")
    await collection.deleteOne({ _id: ObjectId(categoryId) })
    return categoryId
  } catch (err) {
    logger.error(`cannot remove category ${categoryId}`, err)
    throw err
  }
}

async function add(category) {
  try {
    const collection = await dbService.getCollection("category")
    await collection.insertOne(category)
    return category
  } catch (err) {
    logger.error("cannot insert category", err)
    throw err
  }
}

async function update(category) {
  try {
    const categoryToSave = {
      name: category.name,
      imgUrl: category.imgUrl,
      themeImgUrl: category.themeImgUrl,
    }
    const collection = await dbService.getCollection("category")
    await collection.updateOne(
      { _id: ObjectId(category._id) },
      { $set: categoryToSave }
    )
    return category
  } catch (err) {
    logger.error(`cannot update category ${category._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.name) {
    const nameCriteria = { $regex: filterBy.name, $options: "i" }
    criteria.name = nameCriteria
  }
  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}
