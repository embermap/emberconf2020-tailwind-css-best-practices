import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class extends Component {
  @tracked tabs = [];
  @tracked panels = [];
  @tracked activeIndex = 0;

  get activeTabId() {
    return this.tabs[this.activeIndex];
  }

  get activePanelId() {
    return this.panels[this.activeIndex];
  }

  @action
  registerTab(id) {
    this.tabs = [...this.tabs, id];
  }
  @action
  registerPanel(id) {
    this.panels = [...this.panels, id];
  }

  @action
  setActiveTab(id) {
    this.activeIndex = this.tabs.indexOf(id);
  }
}
