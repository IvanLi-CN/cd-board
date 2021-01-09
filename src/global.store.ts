import {Project} from "./projects/project";
import {Observable, Subject} from "rxjs";
import {DeployTask} from "./deploy-tasks/deploy-task";
import {shareReplay} from "rxjs/operators";

export class GlobalStore {
  public readonly currentProject$: Observable<Project>;
  public readonly currentDeployTask$: Observable<DeployTask>;

  private readonly currentProjectSubject: Subject<Project>;
  private readonly currentDeployTaskSubject: Subject<DeployTask>;

  constructor() {
    this.currentProjectSubject = new Subject<Project>();
    this.currentDeployTaskSubject = new Subject<DeployTask>();

    this.currentProject$ = this.currentProjectSubject.pipe(
      shareReplay(1),
    );
    this.currentDeployTask$ = this.currentDeployTaskSubject.pipe(
      shareReplay(1),
    );
  }

  public setCurrentProject(project: Project) {
    this.currentProjectSubject.next(project);
  }
}

export const globalStore = new GlobalStore();
