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
  error: string;
}

const initialState: TaskState = {
  display: 'all',
  tasks: [],
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
    case TaskActionTypes.LoadSuccess:
      return { ...state, tasks: action.payload, error: '' };
    case TaskActionTypes.LoadFail:
      return { ...state, tasks: [], error: action.payload };
    case TaskActionTypes.AddTaskSuccess:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: ''
      };
    case TaskActionTypes.AddTaskFail:
      return { ...state, error: action.payload };
    case TaskActionTypes.UpdateTaskSuccess:
      const updatedTask = state.tasks.map(t =>
        action.payload.id === t.id ? action.payload : t
      );
      return { ...state, tasks: updatedTask, error: '' };
    case TaskActionTypes.UpdateTaskFail:
      return { ...state, error: action.payload };
    case TaskActionTypes.RemoveTaskSuccess:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        error: ''
      };
    case TaskActionTypes.RemoveTaskFail:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
