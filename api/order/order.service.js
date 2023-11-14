const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const utilService = require("../../services/util.service")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy = { txt: "" }) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection("order")
    var orders = await collection.find(criteria).toArray()
    return orders
  } catch (err) {
    logger.error("cannot find orders", err)
    throw err
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection("order")
    const order = collection.findOne({ _id: ObjectId(orderId) })
    return order
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err)
    throw err
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection("order")
    await collection.deleteOne({ _id: ObjectId(orderId) })
    return orderId
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err)
    throw err
  }
}

async function add(order) {
  try {
    const collection = await dbService.getCollection("order")
    await collection.insertOne(order)
    return order
  } catch (err) {
    logger.error("cannot insert order", err)
    throw err
  }
}

async function update(order) {
  try {
    const orderToSave = {...order}
    delete orderToSave._id
    const collection = await dbService.getCollection("order")
    await collection.updateOne(
      { _id: ObjectId(order._id) },
      { $set: orderToSave }
    )
    return order
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  console.log("filterBy: ", filterBy);
  const criteria = {}
  if (filterBy.name) {
    const nameCriteria = { $regex: filterBy.name, $options: "i" }
    criteria.name = nameCriteria
  }
  if (filterBy.shipped) {
    switch (filterBy.shipped) {
      case "shipped":
        criteria.isShipped = true
        break
      case "notShipped":
        criteria.isShipped = false
        break
      default:
        break
    }
  }
  if (filterBy.paid) {
    switch (filterBy.paid) {
      case "paid":
        criteria.isPaid = true
        break
      case "notPaid":
        criteria.isPaid = false
        break
      default:
        break
    }
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
