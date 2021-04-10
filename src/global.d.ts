/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type DndEvent<T> = {
  items: T;
  info: import("svelte-dnd-action").DndEventInfo;
};

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (
      event: CustomEvent<DndEvent> & { target: EventTarget & T }
    ) => void;
    onfinalize?: (
      event: CustomEvent<DndEvent> & { target: EventTarget & T }
    ) => void;
  }
}
