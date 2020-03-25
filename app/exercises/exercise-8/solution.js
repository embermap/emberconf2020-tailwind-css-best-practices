// Exercise 8 solution: Fetching a graph, server driven
import { Server, Model, RestSerializer, belongsTo, hasMany } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: {
      application: RestSerializer,
      message: RestSerializer.extend({
        include: ["user"],
        embed: true
      })
    },

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

      ryan.createMessage({ text: "hey!" });
      sam.createMessage({ text: "hey man" });
      ryan.createMessage({
        text: "hows #coronaconf2020 going?"
      });
      sam.createMessage({
        text: " managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
