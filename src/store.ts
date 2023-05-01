let state = {};

let listeners = [] as any;

const store = {
  updateVisibility(id, visible) {
    state = {
      ...state,
      [id]: visible,
    };
    emitChange();
  },
  subscribe(listener) {
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
