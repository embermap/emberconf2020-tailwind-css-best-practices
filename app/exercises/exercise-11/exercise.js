// Exercise 11: Fetching a graph, client-side with GraphQL
import { Server, Model, belongsTo, hasMany } from "miragejs";
import { buildSchema, graphql } from "graphql";

// Construct a schema, using GraphQL schema language
let graphqlSchema = buildSchema(`
  type Query {
    messages: [Message]
  }

  type Message {
    id: ID!
    text: String!
    user: User
  }

  type User {
    id: ID!
    name: String!
  }
`);

export default function makeServer() {
  return new Server({
    models: {
      user: Model.extend({
        messages: hasMany()
      }),
      message: Model.extend({
        user: belongsTo()
      })
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });

      sam.createMessage({ text: "hey!" });
      ryan.createMessage({ text: "hey man" });
      ryan.createMessage({ text: "hows #coronaconf2020 going?" });
      sam.createMessage({
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.post("/graphql", (schema, request) => {
        let requestJson = JSON.parse(request.requestBody);
        let query = requestJson.query;
        let variables = requestJson.variables;

        let resolver = {
          messages(args) {
            return schema.db.messages.map(message => {
              message.user = schema.db.users.find(message.userId);
              return message;
            });
          }
        };

        return graphql(graphqlSchema, query, resolver, null, variables).then(
          response => {
            return response;
          }
        );
      });
    }
  });
}
