const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redis = require("redis")
const neo4j = require('neo4j-driver');

const app = express();
const PORT = 3200;
const redisClient = redis.createClient();

const user = require("./api/user");
const tile = require("./api/tile")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/tile', tile); 
app.use('/api/user', user);
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "Anturkar@05"));
const session = driver.session();




redisClient.on('connect', function() {
    console.log('Redis connected');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));