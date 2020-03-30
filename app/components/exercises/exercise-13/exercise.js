import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ExercisesExercise14SolutionComponent extends Component {
  @tracked isOpen = false;

  @action
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
