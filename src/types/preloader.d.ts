declare module "preload-it" {
  interface Options {
    stepped?: boolean;
  }

  class Preload {
    constructor(opts?: Options);

    state: [];

    loaded: boolean;

    stepped: boolean;

    onprogress;

    oncomplete;

    onfetched;

    onerror;

    oncancel;

    fetch(list: string[]): Promise<any>;

    updateProgressBar;

    preloadOne(url: string, done: Function): void;

    getItemByUrl(rawUrl: string): void;

    cancel(): void;
  }

  export = Preload;
}
