import Component from "@glimmer/component";
import { guidFor } from "@ember/object/internals";
import { action } from "@ember/object";

export default class extends Component {
  id = guidFor(this);

  get isActive() {
    return this.args.activeTabId === this.id;
  }

  @action
  handleClick() {
    this.args.handleClick(this.id);
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}
