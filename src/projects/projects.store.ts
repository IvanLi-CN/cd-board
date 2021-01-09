import {axios} from "../commons/axios";
import {Project} from "./project";
import {map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

export class ProjectsStore {
  private readonly fetchProjectSubject: Subject<void>;
  public readonly projects$: Observable<Project[]>;

  constructor() {
    this.fetchProjectSubject = new Subject<void>();

    this.projects$ = this.fetchProjectSubject.pipe(
      startWith(null),
      switchMap(() => axios.get<{ records: Project[] }>('/projects').pipe(
        map(data => data.data.records)
      )),
      shareReplay(1),
    );
  }

  refreshList() {
    this.fetchProjectSubject.next();
  }
}

export const projectsStore = new ProjectsStore();
