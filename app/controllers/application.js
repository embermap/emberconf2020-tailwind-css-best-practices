import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
// import exercises from "../exercises";
let exercises = [1, 2, 3];

export default class ApplicationController extends Controller {
  @service router;
  @tracked sidebarIsOpen;

  exercisesCount = exercises.length;

  get currentExercise() {
    let slug = this.router.currentRoute.params.exercise_slug;

    return slug.replace("exercise-", "");
  }

  get previousExercise() {
    return +this.currentExercise > 1 ? +this.currentExercise - 1 : null;
  }

  get nextExercise() {
    return +this.currentExercise < exercises.length
      ? +this.currentExercise + 1
      : null;
  }

  @action
  toggleSidebarIsOpen() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

  @action
  transitionToPreviousExercise() {
    this.router.transitionTo(`/exercise-${this.previousExercise}`);
  }

  @action
  transitionToNextExercise() {
    this.router.transitionTo(`/exercise-${this.nextExercise}`);
  }
}
