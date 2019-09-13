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
  error: string;
}

const initialState: TaskState = {
  display: 'all',
  tasks: [],
  newTask: null,
  updatedTask: null,
  error: ''
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

export const getError = createSelector(
  getTaskFeautureState,
  state => state.error
);

export function reducer(state = initialState, action: TaskActions): TaskState {
  switch (action.type) {
    case TaskActionTypes.ChangeDisplay:
      return { ...state, display: action.payload };
    case TaskActionTypes.AddTask:
      return { ...state, newTask: action.payload };
    case TaskActionTypes.ChangeTaskName:
      return { ...state, updatedTask: action.payload };
    case TaskActionTypes.ChangeTaskStatus:
      return { ...state, updatedTask: action.payload };
    case TaskActionTypes.LoadSuccess:
      return { ...state, tasks: action.payload, error: '' };
    case TaskActionTypes.LoadFail:
      return { ...state, tasks: [], error: action.payload };
    default:
      return state;
  }
}
