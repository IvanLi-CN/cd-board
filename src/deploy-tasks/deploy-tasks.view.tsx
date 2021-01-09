import {Component, h, ComponentChild, createRef} from "preact";
import {Project} from "../projects/project";
import {DeployTask} from "./deploy-task";
import {globalStore} from "../global.store";
import {axios} from "../commons/axios";
import * as R from "ramda";
import {map} from "rxjs/operators";

interface State {
  project: Project,
  deployTasks: DeployTask[],
  isFinished: boolean;
  isLoading: boolean;
}

export class DeployTasksView extends Component<{}, State> {
  loadMoreRef = createRef<HTMLDivElement>();
  private observer: IntersectionObserver;

  constructor() {
    super();
    this.state = {
      project: null,
      deployTasks: [],
      isFinished: false,
      isLoading: false,
    };

    globalStore.currentProject$.subscribe(project => {
      this.setState(() => ({
        project,
      }))
    })
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(([entity]) => {
     if (entity.isIntersecting) {
       this.fetchNextPage();
     }
    }, {
      threshold: [0, 0.1, 1],
    });

    this.observer.observe(this.loadMoreRef.current);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.loadMoreRef.current);
  }


  render(): ComponentChild {
    const list = this.state.deployTasks.map(task => (
      <li>
        <Card task={task}/>
      </li>
    ))
    return <section>
      <h2>{this.state.project?.name}</h2>
      <ol>
        {list}
      </ol>
      <div ref={this.loadMoreRef}>加载更多</div>
    </section>;
  }

  private fetchNextPage() {
    if (this.state.isLoading || this.state.isFinished) { return; }
    this.setState(() => ({
      isLoading: true,
    }));
    axios.get('/deploy-tasks', {
      params: {
        lastCreatedAt: R.last(this.state.deployTasks)?.createdAt,
        pageSize: 20,
        projectId: this.state.project?.id,
      }
    }).pipe(
      map(res => res.data)
    ).subscribe((deployTasks: DeployTask[]) => {
      this.setState(state => ({
        deployTasks: R.uniqWith(R.propEq('id'), [...state.deployTasks, ...deployTasks]),
        isLoading: false,
        isFinished: deployTasks.length === 0,
      }));
    }, err => {
      console.warn(err);
      this.setState(() => ({
        isLoading: false,
      }))
    });
  }
}

function Card({task}: { task: DeployTask }) {
  return <section>
    <h3>{new Date(task.createdAt).toLocaleString()}</h3>
  </section>;
}
