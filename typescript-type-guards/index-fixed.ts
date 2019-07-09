import { DeepPartial } from './deep-partial'

interface Todo {
  title: string;
  description: string;
  reminders: TodoReminders;
}

interface TodoReminders {
  remindTimes: Date[];
  alarmSound: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: DeepPartial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1: Todo = {
  title: 'organize desk',
  description: 'clear clutter',
  reminders: {
    remindTimes: [ new Date('2019-09-10'), new Date('2019-09-11') ],
    alarmSound: 'bell'
  }
};

const todo2: Todo = updateTodo(todo1, {
  description: 'throw out trash',
  reminders: {
    remindTimes: [ new Date('2019-09-11') ]
  }
});
