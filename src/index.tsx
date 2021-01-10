import "preact/debug";
import { render, h, Component } from 'preact';
import './index.scss'
import { DefaultLayout } from './layouts/default.layout';
import { ProjectsView } from './projects/projects.view';
import { Project } from "./projects/project";
import { routerBus } from "./events/router.bus";
import {DeployTasksView} from "./deploy-tasks/deploy-tasks.view";
import {globalStore} from "./global.store";
import {ProjectEditorView} from "./projects/project-editor.view";

interface State {
  project: Project,
  currPage: Component,
}

class Main extends Component<{}, State> {
  projectView = <ProjectsView />;

  constructor() {
    super();
    globalStore.currentPageSubject.subscribe(view => {
      this.setState(() => ({
        currPage: view,
      }));
    });
  }

  componentWillMount() {
    routerBus.addListener('replace', ({project}) => {
       this.setState(() =>( {
         project,
       }));
    });
  }

  render() {
    if (this.state.currPage) {
      return this.state.currPage
    }
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
