import Route from "@ember/routing/route";

export default class extends Route {
  model({ exercise_slug }) {
    return {
      exerciseNumber: exercise_slug.replace("exercise-", "")
    };
  }
}
