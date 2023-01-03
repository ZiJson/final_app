import express from "express";
import { ApolloServer} from "apollo-server-express";
import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";
import "dotenv-defaults/config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from 'fs';
import {
  createPubSub, createSchema,
  createYoga
} from 'graphql-yoga';

import { ProjectModel } from "./backend/models/db.js";
import Query from "./backend/resolvers/Query.js";
import Mutation from "./backend/resolvers/Mutation.js";
// import Subscription from "./backend/src/resolvers/Subscription.js";
// import ChatBox from './backend/src/resolvers/ChatBox.js';
import mongo from "./backend/mongo.js";
// import apiRoute from "./backend/route/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/schema.graphql");
const pubsub = createPubSub();
const app = express();

app.use(cors());
// app.use("/api", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    // ChatBox
  },
  context: {
    ProjectModel,
    pubsub,
  },
});

server.applyMiddleware({  app});
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});