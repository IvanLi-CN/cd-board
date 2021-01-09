import { Component, h } from "preact";
import { Project } from "./project";

interface Props {
  project: Project,
}
export class ProjectSummaryCardComponent extends Component<Props> {

  render() {
    return (
      <section class="bg-gray-900 p-5 my-px text-yellow-200">
        <h2>{this.props.project.name}</h2>
        <p class="text-gray-400 text-xs">{this.props.project.repository.fullName}</p>
      </section>
    )
  }
}
