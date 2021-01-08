import { Component, h } from "preact";
interface Props {
  first: Component,
  second: Component,
  third: Component,
}
export class DefaultLayout extends Component<Props> {
  constructor() {
    super();
    this.state = {
      activePanel: 1,
    };
  }
  render() {
    console.log(this.props.first)
    return (
      <section class="default-layout flex h-screen">
        <aside
          class={`flex-none h-full bg-gray-400 w-full sm:w-1/2 md:w-1/3 lg:w-44 fixed sm:static ${this.state.activePanel === 1 ? '' : 'hidden sm:block'
            }`}
        >
          {this.props.first}
        </aside>
        <aside class={`flex-none h-full bg-gray-100 w-full sm:w-1/2 md:w-2/3 lg:w-48 fixed sm:static ${this.state.activePanel === 2 ? '' : 'hidden sm:block'}`}>
        {this.props.second}
       </aside>
        <main class={`h-full flex-none lg:flex-1 lg:w-auto w-full bg-gray-600 fixed lg:static ${this.state.activePanel === 3 ? '' : 'hidden lg:block'}`}>
        {this.props.third}
        </main>
      </section>
    );
  }

  goto(index) {
    this.setState(state => {
      return {
        activePanel: index,
      };
    });
    console.log(this.state);
  }
}