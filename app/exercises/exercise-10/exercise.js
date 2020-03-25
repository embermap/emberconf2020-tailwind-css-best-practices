// Exercise 10: Fetching a graph, client-side
import { Server, Model, belongsTo, hasMany, JSONAPISerializer } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: {
      application: JSONAPISerializer
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

      sam.createMessage({ text: "hey!" });
      ryan.createMessage({ text: "hey man" });
      ryan.createMessage({ text: "hows #coronaconf2020 going?" });
      sam.createMessage({
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
