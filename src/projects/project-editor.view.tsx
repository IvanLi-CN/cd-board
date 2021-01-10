import {Component, h} from "preact";
import * as R from "ramda";
import {Project} from "./project";
import {axios} from "../commons/axios";
import {globalStore} from "../global.store";
import {projectsStore} from "./projects.store";
import {iif} from "rxjs";

interface Props {
  project?: Project,
}

interface State {
  project?: Partial<Project>,
}

export class ProjectEditorView extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      project: {}
    }
  }

  componentWillMount() {
    this.setState({
      project: this.props.project ?? {
        repository: {
          sshUrl: '',
          fullName: ''
        }
      },
    });
  }

  render() {
    return (<section>
      <h2>{this.props.project?.name}</h2>
      <form class="p-8" onSubmit={this.onSubmit} onReset={this.onReset}>
        <label class="my-6 block">
          <span class="hidden">项目名称</span>
          <input placeholder="项目名称" class="rounded-full px-4 py-2 w-full" value={this.state.project.name}
                 oninput={(ev => this.onFormDataChange('name', ev))}/>
        </label>
        <label class="my-6 block">
          <span class="hidden">项目描述</span>
          <textarea placeholder="项目描述" class="rounded-3xl px-4 py-2 w-full h-28" value={this.state.project.remarks}
                    oninput={(ev => this.onFormDataChange('remarks', ev))}/>
        </label>
        <label class="my-6 block">
          <span class="hidden">Webhook Secret</span>
          <input placeholder="Webhook Secret" class="rounded-full px-4 py-2 w-full"
                 value={this.state.project.webhookSecret}
                 oninput={(ev => this.onFormDataChange('webhookSecret', ev))}/>
        </label>
        <label class="my-6 block">
          <span class="hidden">Git 项目全称</span>
          <input placeholder="Git 项目全称" class="rounded-full px-4 py-2 w-full"
                 value={this.state.project.repository.fullName}
                 oninput={(ev => this.onFormDataRepositoryChange('fullName', ev))}/>
        </label>
        <label class="my-6 block">
          <span class="hidden">Git SSH URL</span>
          <input placeholder="Git SSH URL" class="rounded-full px-4 py-2 w-full"
                 value={this.state.project.repository.sshUrl}
                 oninput={(ev => this.onFormDataRepositoryChange('sshUrl', ev))}/>
        </label>
        <footer class="text-right">
          <input class="bg-red-500 py-2 px-4 text-white rounded-full shadow-lg" type="reset" value="取消"/>
          <input class="ml-2 bg-white py-2 px-4 text-gray-800 rounded-full shadow-lg" type="submit" value="提交"/>
        </footer>
      </form>
      <p>{JSON.stringify(this.state.project)}</p>
    </section>);
  }

  onFormDataChange(field, ev) {
    this.setState({
      project: Object.assign(this.state.project, {[field]: ev.target.value})
    });
  }

  onFormDataRepositoryChange(field, ev) {
    this.setState({
      project: R.mergeDeepRight(this.state.project, {repository: {[field]: ev.target.value}})
    });
  }

  onSubmit = (ev: Event) => {
    ev.preventDefault();
    iif(
      () => !!this.props.project,
      axios.put(`/projects/${this.props.project.id}`, {
        ...this.state.project,
      }),
      axios.post('/projects', {
        ...this.state.project,
      }),
    )
      .subscribe(() => {
        projectsStore.refreshList();
        globalStore.currentPageSubject.next(null);
      }, error => {
        console.log(error);
      });
  }

  onReset = (ev: Event) => {
    ev.preventDefault();
    globalStore.currentPageSubject.next(null);
  }


}
