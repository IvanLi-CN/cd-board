import "preact/debug";
import { render, h, Component } from 'preact';
import './index.scss'
import { DefaultLayout } from './layouts/default.layout';
import { ProjectsView } from './projects/projects.view';
import { Project } from "./projects/project";
import { routerBus } from "./events/router.bus";
import {projectStore} from "./projects/project.store";
import {DeployTasksView} from "./deploy-tasks/deploy-tasks.view";

interface State {
  project: Project,
}

class Main extends Component<{}, State> {
  projectView = <ProjectsView />;

  componentWillMount() {
    routerBus.addListener('replace', ({project}) => {
       this.setState(() =>( {
         project,
       }));
    });

    // projectStore.refreshList()
  }

  render() {
    const tasksView = <div>{JSON.stringify(this.state.project)}</div>;
    return <DefaultLayout
  first={this.projectView}
  second={<DeployTasksView />}
   third={null}/>
  }
}

render(
  <Main />,
  document.getElementById('root')
);
