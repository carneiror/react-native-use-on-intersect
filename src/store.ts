let state: Record<string, boolean> = {};

let listeners = [] as (() => void)[];

const store = {
  updateVisibility(id: string, visible: boolean) {
    state = {
      ...state,
      [id]: visible,
    };
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return state;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export default store;
