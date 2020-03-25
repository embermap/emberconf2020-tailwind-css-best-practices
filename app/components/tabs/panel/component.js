import Component from "@glimmer/component";
import { guidFor } from "@ember/object/internals";
import { action } from "@ember/object";
import { scheduleOnce } from "@ember/runloop";

export default class extends Component {
  id = guidFor(this);

  get isActive() {
    return this.args.activePanelId === this.id;
  }

  @action
  handleInsert() {
    scheduleOnce("afterRender", this, this.safetlyHandleInsert);
  }

  safetlyHandleInsert() {
    this.args.didInsert(this.id);
  }
}
