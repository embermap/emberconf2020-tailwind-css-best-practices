import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class ApplicationController extends Controller {
  @service router;
  @tracked sidebarIsOpen;

  exercisesCount = 14;

  get currentExercise() {
    let slug = this.router.currentRoute.parent.params.exercise_slug;

    return slug.replace("exercise-", "");
  }

  get previousExercise() {
    return +this.currentExercise > 1 ? +this.currentExercise - 1 : null;
  }

  get nextExercise() {
    return +this.currentExercise < this.exercisesCount
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
