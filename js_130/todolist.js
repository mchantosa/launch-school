const Todo = require('./todo');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('TypeError: can only add Todo objects');
    } else this.todos.push(todo);
  }

  getTitle() {return this.getTitle}

  size() {return this.todos.length}

  first() {return this.todos[0]}

  last() {return this.todos[this.size() - 1]}

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    const returnStr = [`---- Today's Todos ----`];
    this.todos.forEach(todo => returnStr.push(todo.toString()));
    return returnStr.join('\n');
  }

  forEach(callback, thisArg) {
    const arr = this.todos;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      callback.call(thisArg, element, index, arr);
    }
  }

  filter(callback, thisArg) {

    const list = new TodoList(this.title);
    const filteredArr = list.todos;
    const arr = this.todos;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (callback.call(thisArg, element, index, arr)) {
        filteredArr.push(element);
      }
    }
    return list;
  }

  findByTitle(title) {
    const matchingTodos = this.filter(todo => todo.getTitle() === title);
    return (matchingTodos.size()) ? matchingTodos.itemAt(0) : undefined;
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    const matchingTodos = this.findByTitle(title);
    if (matchingTodos) matchingTodos.markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

}

module.exports = TodoList;