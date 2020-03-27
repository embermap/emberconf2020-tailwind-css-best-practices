import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class extends Component {
  @service router;

  get isActive() {
    let routerArgs = [this.args.route];
    if (this.args.models) {
      routerArgs = [...routerArgs, ...this.args.models];
    }

    let url = this.router.urlFor(routerArgs);

    return this.router.currentURL.startsWith(url);
  }
}
