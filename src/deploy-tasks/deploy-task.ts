import {Project} from "../projects/project";
import {DeployTaskStatuses} from "./deploy-task-statuses.enum";

export class DeployTask {
  projectId: string;
  project: Project;
  status: DeployTaskStatuses;
  finishedAt: Date;
  sourcePath: string;
  createdAt: Date;
}
