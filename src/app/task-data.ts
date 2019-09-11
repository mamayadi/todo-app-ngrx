import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Task } from './models/task';

export class TaskData implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {
        id: 1,
        taskName: 'task 1',
        status: false
      },
      {
        id: 2,
        taskName: 'task 2',
        status: false
      }
    ];
    return { tasks };
  }
}
