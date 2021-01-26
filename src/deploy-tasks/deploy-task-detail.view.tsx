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

  const list = project.pipes?.map(it => <li 
    class="inline-block py-2 px-8 text-gray-900 cursor-pointer hover:text-red-400"
    >{it}</li>)

   return (
    <header class="bg-white overflow-auto">
      <h2 class="text-black text-xl m-2">{project?.name}</h2>
      <small class="text-gray-400 text-xs mx-2 my-1">{project?.remarks}</small>
      <nav class="bg-gray-100 px-2">
        <ol class="block">
          {list}
        </ol>
      </nav>
    </header>
   )
}