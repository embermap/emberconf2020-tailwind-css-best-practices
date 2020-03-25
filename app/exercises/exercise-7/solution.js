// Exercise 7 solution: One to many
import { Server, Model, RestSerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

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

      server.create("message", { user: sam, text: "hey!" });
      server.create("message", { user: ryan, text: "hey man" });
      server.create("message", {
        user: sam,
        text: "hows #coronaconf2020 going?"
      });
      server.create("message", {
        user: ryan,
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
