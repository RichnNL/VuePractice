import { reactive, readonly } from 'vue';

export abstract class Store<T extends Record<string, unknown>> {
  protected state: T;

  protected defaultState: T;

  constructor() {
    const data = this.data();
    this.setup(data);
    this.state = reactive(data) as T;
    this.defaultState = JSON.parse(JSON.stringify(this.state));
  }

  protected abstract data(): T;

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  protected setup(data: T): void { }

  public getState(): T {
    // This prevents devs to update the state directly and makes sure that they will need to use an action
    return readonly(this.state) as T;
  }

  // Checks if the application is running online or offline
  public isOnline(): boolean {
    return navigator.onLine;
  }

  public resetStore() {
    this.state = JSON.parse(JSON.stringify(this.defaultState));
  }
}
