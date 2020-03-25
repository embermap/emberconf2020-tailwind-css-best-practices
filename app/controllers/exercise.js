import Controller from "@ember/controller";

export default class ExerciseController extends Controller {
  queryParams = ["tab"];

  tab = "config";
}
