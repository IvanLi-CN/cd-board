import { DeployPipeTypes } from "./deploy-pipe-types.enum";
import {GitRepository} from "./git-repository";

export class Project {
  name: string;
  repository: GitRepository;
  webhookSecret: string;
  remarks: string;
  isDelete: boolean;
  pipes: DeployPipeTypes[];
  id: string;
}
