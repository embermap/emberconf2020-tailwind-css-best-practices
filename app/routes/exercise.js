import Route from "@ember/routing/route";
import { scheduleOnce } from "@ember/runloop";
import { set } from "@ember/object";
import exercises from "../exercises";

export default class extends Route {
  model({ exercise_slug }) {
    // Exercises are 1-based
    let exerciseNumber = +exercise_slug.replace("exercise-", "");
    let exerciseIndex = exerciseNumber - 1;

    let server = exercises[exerciseIndex]();
    return {
      server,
      exerciseSlug: exercise_slug
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    set(controller, "show", false);
    scheduleOnce("afterRender", this, this.deferredWork);
  }

  deferredWork() {
    set(this.controller, "show", true);
  }
}
