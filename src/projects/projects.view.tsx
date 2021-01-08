import { Component, h } from "preact";
import { routerBus } from "../events/router.bus";
import { Project } from "./project";
import { ProjectSummaryCardComponent } from "./project-summary-card.component";

interface State {
  projects: Project[];
}
export class ProjectsView extends Component<{}, State> {
  constructor() {
    super();
    this.setState(() => ({
      projects: new Array(10).fill(null).map((_, i) => ({
        name: `TEST PROJECT ${i}`,
        repository: {
          fullName: `IvanLiCN/test-project-${i}`
        }
      }))
    }));
  }
  render() {
    const list = this.state.projects.map(project => (
      <li onClick={() => this.itemOnClick(project)}>
        <ProjectSummaryCardComponent project={project}></ProjectSummaryCardComponent>
      </li>
    ))
    return <ol>
      {list}
    </ol>
  }
  itemOnClick(project: Project) {
    routerBus.emit('replace', {project})
  }
}