import { TaskActionTypes, TaskActions } from './app.actions';
import { State } from './app.state';

const initalState: State = {
  tasks: [],
  task: null,
  display: 'all'
};

export function reducer(state = initalState, action: TaskActions) {
  console.log('in reducer', action);
  switch (action.type) {
    case TaskActionTypes.GetTasks:
      return { ...state, tasks: action.payload };
    case TaskActionTypes.AddTask:
      return { ...state, task: action.payload };
    case TaskActionTypes.UpdateTaskStatus:
      return { ...state, task: action.payload };
    case TaskActionTypes.UpdateTaskName:
      return { ...state, task: action.payload };
    case TaskActionTypes.RemoveTask:
      return { ...state, task: action.payload };
    case TaskActionTypes.ChangeDisplay:
      return { ...state, display: action.payload };
    default:
      return state;
  }
}
