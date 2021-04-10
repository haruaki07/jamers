declare module "preloader.js" {
  type OnProgressFunction = (
    loaded?: number,
    length?: number,
    resource?: string
  ) => void;

  type OnCompleteFunction = (length?: number) => void;

  type GetFunction = (resource?: string) => void;

  type StartFunction = () => void;

  interface Options {
    /**
     * Preload resouce list. The files of postfix belong to ['mp3', 'ogg', 'wav'] to according audio handle.
     *
     * PS：Resources in addition to here configuration, including configured attr value DOM node.
     * @default []
     */
    resources: string[];
    /**
     * Concurrent number. 0 is no concurrency limit.
     * @default 0
     */
    concurrency: number;
    /**
     * Minimum loading time per resouce. Usually used to simulate load slow. (ms)
     * @default 0
     */
    perMinTime: number;
    /**
     * DOM node attribute. Example: `<img src="img/logo.png" data-preload/>`, the `'img/logo.png'` will been added in `resources`.
     * @default "data-preload"
     */
    attr: string;
    /**
     * If set to `true`, which will set the crossOrigin property on images to `Anonymous` for support images loaded from a CORS-enabled server.
     * @default false
     */
    crossOrigin: boolean;
    /**
     * Every resouce load is completed the callback function. The effect same to `addProgressListener`.
     * @default null
     */
    onProgress: OnProgressFunction;
    /**
     * All resouces load is completed the callback function. The effect same to `addCompletionListener`.
     * @default null
     */
    onCompletion: OnCompleteFunction;
  }

  class Preloader {
    constructor(opts: Partial<Options>);

    /**
     * Set every resouce load is completed the callback function
     */
    addProgressListener(cb: OnProgressFunction): void;

    /**
     * Set all resouces load is completed the callback function
     */
    addCompletionListener(cb: OnCompleteFunction): void;

    /**
     * Get instances of completed
     */
    get(resource: string): HTMLImageElement;

    /**
     * Begin load. All ready after invoke.
     */
    start(): void;
  }

  export = Preloader;
}
