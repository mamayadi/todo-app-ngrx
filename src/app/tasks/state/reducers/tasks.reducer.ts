import { Task } from '../../../models/task';

// NgRx
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskActionTypes, TaskActions } from '../actions/tasks.actions';

export interface State {
  tasks: TaskState;
}

export interface TaskState {
  display: string;
  tasks: Task[];
  newTask: Task;
  updatedTask: Task;
}

const initialState: TaskState = {
  display: 'all',
  tasks: [],
  newTask: null,
  updatedTask: null
};

// Selector functions

const getTaskFeautureState = createFeatureSelector<TaskState>('tasks');

export const getDisplay = createSelector(
  getTaskFeautureState,
  state => state.display
);

export const getTasks = createSelector(
  getTaskFeautureState,
  state => state.tasks
);


export function reducer(state = initialState, action: TaskActions): TaskState {
  switch (action.type) {
    case TaskActionTypes.ChangeDisplay:
      return { ...state, display: action.payload };
      case TaskActionTypes.AddTask:
          return {...state, newTask: action.payload };
      case TaskActionTypes.ChangeTaskName:
          return { ...state, updatedTask: action.payload  };
          case TaskActionTypes.ChangeTaskStatus:
          return { ...state, updatedTask: action.payload  };
    default:
      return state;
  }
}
