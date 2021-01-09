import {axios} from "../commons/axios";
import {map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {DeployTask} from "./deploy-task";

export class DeployTasksStore {
  private readonly fetchDeployTasksSubject: Subject<void>;
  public readonly deployTasks$: Observable<DeployTask[]>;

  constructor() {
    this.fetchDeployTasksSubject = new Subject<void>();

    this.deployTasks$ = this.fetchDeployTasksSubject.pipe(
      startWith(null),
      switchMap(() => axios.get<{ records: DeployTask[] }>(
        '/deploy-tasks',
        {
          params: {

          }
        }
      ).pipe(
        map(data => data.data.records)
      )),
      shareReplay(1),
    );
  }

  refreshList() {
    this.fetchDeployTasksSubject.next();
  }
}

export const deployTasks = new DeployTasksStore();
