import {h} from 'preact';
import {useCallback, useState} from 'preact/hooks';
import { Project } from '../projects/project';
import { globalStore } from '../global.store';
import './deploy-task-detail.view.scss'
import { DeployPipeTypes } from '../projects/deploy-pipe-types.enum';

export function DeployTaskDetailView() {



  return (
    <section class="deploy-task-detail-view">
      <Header />
    </section>
  )
}

function Header() {
  const [project, setProject] = useState<Project>((() => {
    const p = new Project();
    p.name = 'Test Project';
    p.remarks = 'This is a test project';
    p.pipes = [DeployPipeTypes.checkout, DeployPipeTypes.installDependencies, DeployPipeTypes.test, DeployPipeTypes.build, DeployPipeTypes.deploy, DeployPipeTypes.cleanup];
    return p;
  })());

  globalStore.currentProject$.subscribe(val => {
    useCallback(val => setProject(val), [val]);
  })

  const list = project.pipes?.map(it => <li >{it}</li>)

   return (
    <header class="bg-white p-4">
      <h2 class="text-black text-xl">{project?.name}</h2>
      <small class="text-gray-400 text-xs">{project?.remarks}</small>
      <nav>
        <ol>
          {list}
        </ol>
      </nav>
    </header>
   )
}