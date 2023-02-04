// eslint-disable-next-line import/no-extraneous-dependencies
import { add } from 'date-fns';

export default class Task {
  constructor(title, desc, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    // input type of "date"
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
