// Exercise 5 solution: Practice with belongs to
import { Server, Model, RestSerializer, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model,

      message: Model.extend({
        user: belongsTo()
      }),

      activity: Model.extend({
        user: belongsTo()
      })
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });

      server.create("message", { user: ryan, text: "hey!" });
      server.create("message", { user: sam, text: "hey man" });
      server.create("message", {
        user: ryan,
        text: "hows #coronaconf2020 going?"
      });
      server.create("message", {
        user: sam,
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });

      server.create("activity", { kind: "reaction", user: sam });
    },

    routes() {
      this.resource("user");
      this.resource("message");
      this.resource("activity");
    }
  });
}
