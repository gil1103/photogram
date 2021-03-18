const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;
const asyncLocalStorage = require("../../services/als.service");

module.exports = {
  query,
  remove,
  add,
  update,
  getById,
};

async function query(filterBy = {}) {
  console.log("query-filterBy", filterBy.byUser);
  
  try {
    const collection = await dbService.getCollection("post");
    if (filterBy.byUser) {
       posts = await collection.find({'byUser.fullname':filterBy.byUser}).toArray()
    }else posts = await collection.find({}).toArray()
    return posts;
    
  } catch (err) {
    logger.error("cannot find posts", err);
    throw err;
  }
}

async function getById(postId) {
  try {
    const collection = await dbService.getCollection("post");
    const post = await collection.findOne({ _id: ObjectId(postId) });
    return post;
  } catch (err) {
    logger.error(`while finding post ${postId}`, err);
    throw err;
  }
}

async function remove(postId) {
  try {
    const collection = await dbService.getCollection("post");
    await collection.deleteOne({ _id: ObjectId(postId) });
  } catch (err) {
    logger.error(`cannot remove post ${postId}`, err);
    throw err;
  }
}

async function add(post) {
  try {
    post._id = ObjectId(post._id);
    post.createdAt = Date.now();
    const collection = await dbService.getCollection("post");
    await collection.insertOne(post);
    return post;
  } catch (err) {
    console.log("err", err);
    logger.error("cannot insert post", err);
    throw err;
  }
}
async function update(post) {
  try {
    post._id = ObjectId(post._id);

    const collection = await dbService.getCollection("post");
    await collection.updateOne({ _id: post._id }, { $set: post });
    console.log("UPDATE ONE!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return post;
  } catch (err) {
    console.log("err", err);
    logger.error("cannot insert post", err);
    throw err;
  }
}

