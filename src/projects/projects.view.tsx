import { Component, h } from "preact";
import { Project } from "./project";
import { ProjectSummaryCardComponent } from "./project-summary-card.component";
import {projectsStore} from "./projects.store";
import {globalStore} from "../global.store";

interface State {
  projects: Project[];
}
export class ProjectsView extends Component<{}, State> {
  constructor() {
    super();
    this.state = {
      projects: [],
    }

    this.fetchBaseData();
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
    globalStore.setCurrentProject(project);
  }

  private fetchBaseData() {
    projectsStore.projects$.subscribe(projects => {
      this.setState(() => ({
        projects,
      }));
    })
  }
}
