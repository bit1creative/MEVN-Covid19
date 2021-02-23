import { request } from "http";

export {};
const express = require("express");
const mongodb = require("mongodb");

const {
  MONGO_URL,
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
} = require("../../../config.json");

const router = express.Router();

//Get post
router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

//Add post
router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

//Delete post
router.delete('/:id', async (req,res)=>{
  const posts = await loadPostCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(MONGO_URL, {
    auth: {
      user: MONGO_DB_USER,
      password: MONGO_DB_PASSWORD,
    },
    useUnifiedTopology: true,
  });

  return client.db("covid-19").collection("data");
}

module.exports = router;
