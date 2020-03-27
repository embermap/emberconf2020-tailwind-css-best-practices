import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route("exercise", { path: "/:exercise_slug" }, function() {
    this.route("child-1");
    this.route("child-2");
    this.route("child-3");
  });
});
