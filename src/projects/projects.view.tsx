import { Component, h } from "preact";
import { Project } from "./project";
import { ProjectSummaryCardComponent } from "./project-summary-card.component";
import {projectsStore} from "./projects.store";
import {globalStore} from "../global.store";
import {ProjectEditorView} from "./project-editor.view";

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
    const list = this.state.projects?.map(project => (
      <li onClick={() => this.itemOnClick(project)}>
        <ProjectSummaryCardComponent project={project}/>
      </li>
    ));
    return (
      <section>
        <header>
          <button onClick={this.createProject}>Create</button>
        </header>
        <ol>
          {list}
        </ol>
      </section>
    )
  }
  itemOnClick(project: Project) {
    globalStore.setCurrentProject(project);
  }

  createProject = () => {
    globalStore.currentPageSubject.next(<ProjectEditorView project={null}/>)
}

  private fetchBaseData() {
    projectsStore.projects$.subscribe(projects => {
      this.setState(() => ({
        projects,
      }));
    })
  }
}
