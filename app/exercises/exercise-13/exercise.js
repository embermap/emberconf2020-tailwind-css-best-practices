// Exercise 13: Many to many, the join record
import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from "miragejs";

export default function makeServer() {
  return new Server({
    serializers: { application: JSONAPISerializer },

    models: {
      user: Model.extend({
        messages: hasMany(),
        channels: hasMany()
      }),

      message: Model.extend({
        user: belongsTo()
      }),

      channel: Model.extend({
        users: hasMany()
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

      general.update({ users: [sam, ryan] });
      video.update({ users: [sam] });
      podcast.update({ users: [ryan] });
    },

    routes() {
      this.resource("user");
      this.resource("message");
      this.resource("channel");
    }
  });
}
