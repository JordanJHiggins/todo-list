// eslint-disable-next-line import/no-extraneous-dependencies
import { add } from 'date-fns';

export default class Task {
  constructor(title, desc, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getTitle() {
    return this.title;
  }

  getDesc() {
    return this.desc;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.getPriority;
  }
}
