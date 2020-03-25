// Exercise 6 solution: Has many association
import { Server, Model, RestSerializer, hasMany } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model.extend({
        messages: hasMany()
      }),
      message: Model
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });

      sam.createMessage({ text: "hey!" });
      ryan.createMessage({ text: "hey man" });
      sam.createMessage({
        text: "hows #coronaconf2020 going?"
      });
      ryan.createMessage({
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
