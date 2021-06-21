import express from "express";
import path from "path";
import mongo from "./mongo.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv-defaults";
import pkg from "graphql-yoga";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import chatBox from "./resolvers/chatBox.js";
import message from "./resolvers/message.js";
import Subscription from "./resolvers/Subscription.js";
const { GraphQLServer, PubSub } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
// const server = http.createServer(app);

// const wss = new WebSocket.Server({
//   server,
// });
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Query,
    Mutation,
    chatBox,
    message,
    Subscription,
  },
  context: {
    pubsub,
  },
});

app.use(express.static(path.join(__dirname, "public")));
server.start({ port: 4000 }, () => {
  console.log(`The server is up on port ${4000}!`);
});
mongo.connect();
