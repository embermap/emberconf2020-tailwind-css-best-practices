// Exercise 13 Solution: Many to many, the join record
import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: JSONAPISerializer },

    models: {
      user: Model.extend({
        messages: hasMany(),
        memberships: hasMany()
      }),

      message: Model.extend({
        user: belongsTo()
      }),

      membership: Model.extend({
        user: belongsTo(),
        channel: belongsTo()
      }),

      channel: Model.extend({
        memberships: hasMany()
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

      let general = server.create("channel", { name: "general" });
      let video = server.create("channel", { name: "video" });
      let podcast = server.create("channel", { name: "podcast" });

      server.create("membership", { user: sam, channel: general });
      server.create("membership", { user: sam, channel: video });
    },

    routes() {
      this.resource("user");
      this.resource("message");
      this.resource("channel");
      this.resource("membership");
    }
  });
}
