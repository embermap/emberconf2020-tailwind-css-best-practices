import Component from "@glimmer/component";
import { htmlSafe } from "@ember/string";

export default class AspectRatioComponent extends Component {
  get style() {
    let paddingBottom = this.args.ratio
      .split(":")
      .map(str => +str)
      .reduce((prev, curr) => curr / prev);

    return htmlSafe(`padding-bottom: ${paddingBottom * 100}%`);
  }
}
