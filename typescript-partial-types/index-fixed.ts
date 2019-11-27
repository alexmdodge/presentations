import { DeepPartial } from './deep-partial'
import extend from 'extend'

interface Todo {
  title: string;
  description: string;
  reminders: TodoReminders;
}

interface TodoReminders {
  remindTimes: Date[];
  alarmSound: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: DeepPartial<Todo>): Todo {
  // Deeply extend
  const value = extend(true, {}, todo, fieldsToUpdate)
  return value
}

const todo1: Todo = {
  title: 'organize desk',
  description: 'clear clutter',
  reminders: {
    remindTimes: [
      new Date('2019-09-10'),
      new Date('2019-09-11')
    ],
    alarmSound: 'bell'
  }
};

const todo2: Todo = updateTodo(todo1, {
  description: 'throw out trash',
  reminders: {
    remindTimes: [
      new Date('2019-09-11')
    ]
  }
});

console.log('Todo 1 is: ', todo1)
console.log('Todo 2 is: ', todo2)