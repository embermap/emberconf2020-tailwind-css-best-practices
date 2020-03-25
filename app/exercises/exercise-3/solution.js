// Exercise 3 Solution: Practice creating a model
import { Server, Model, RestSerializer } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: RestSerializer },

    models: {
      user: Model,
      message: Model
    },

    seeds(server) {
      server.create("user", { name: "Sam" });

      server.create("message", { text: "Hey!" });
      server.create("message", { text: "yo man whats up" });
    },

    routes() {
      this.resource("user");
      this.resource("message");
    }
  });
}
