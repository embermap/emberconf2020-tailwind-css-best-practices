// Exercise 14 solution: Practice with many to many joins
import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: JSONAPISerializer },

    models: {
      user: Model.extend({
        messages: hasMany(),
        friendships: hasMany({ inverse: "from" })
      }),

      friendship: Model.extend({
        from: belongsTo("user"),
        to: belongsTo("user")
      }),

      message: Model.extend({
        user: belongsTo()
      })
    },

    seeds(server) {
      let sam = server.create("user", { name: "Sam" });
      let ryan = server.create("user", { name: "Ryan" });
      let yehuda = server.create("user", { name: "Yehuda" });

      server.create("friendship", { from: sam, to: ryan });
      server.create("friendship", { from: sam, to: yehuda });

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
