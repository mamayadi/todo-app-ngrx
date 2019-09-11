import { Task } from '../models/task';

export interface State {
    tasks: Task[];
    task: Task;
    display: string;
}
