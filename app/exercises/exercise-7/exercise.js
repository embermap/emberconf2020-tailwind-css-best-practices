// Exercise 7: One to many
import { Server, Model, RestSerializer } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model.extend({
        //
      }),
      message: Model.extend({
        //
      })
    },

    seeds(server) {
      server.create("user", { name: "Sam" });
      server.create("user", { name: "Ryan" });

      server.create("message", { text: "hey!" });
      server.create("message", { text: "hey man" });
      server.create("message", {
        text: "hows #coronaconf2020 going?"
      });
      server.create("message", {
        text: "I managed to buy groceries but somehow all I'm eating is candy"
      });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
