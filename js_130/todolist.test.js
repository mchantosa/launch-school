/* eslint max-lines-per-function: 0 */
/* eslint max-statements: 0 */

const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');
    list = new TodoList();
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  describe('size()', () => {
    test('list size should be 3', () => {
      expect(list.size()).toBe(3);
    });
  });

  describe('toArray()', () => {
    test('should return list as an array', () => {
      expect(list.toArray()).toEqual([todo1, todo2, todo3]);
    });
    test('returned array should be a COPY of todos', () => {
      expect(list.toArray()).not.toBe(list.todos);
    });
  });

  describe('first()', () => {
    test('should return todo1', () => {
      expect(list.first()).toBe(todo1);
    });
  });

  describe('last()', () => {
    test('should return last todo3', () => {
      expect(list.last()).toBe(todo3);
    });
  });

  describe('shift()', () => {
    test('should return todo1', () => {
      expect(list.shift()).toEqual(todo1);
    });
    test('resulting list should NOT contain todo1', () => {
      list.shift();
      expect(list.toArray()).toEqual([todo2, todo3]);
    });
  });

  describe('pop()', () => {
    test('should return todo3', () => {
      expect(list.pop()).toEqual(todo3);
    });
    test('resulting list should NOT contain todo3', () => {
      list.pop();
      expect(list.toArray()).toEqual([todo1, todo2]);
    });
  });

  describe('isDone()', () => {
    test('should return true (all todos are marked done)', () => {
      todo1.markDone();
      todo2.markDone();
      todo3.markDone();
      expect(list.isDone()).toBeTruthy();
    });
    test('should return false (todo3 is not marked done)', () => {
      todo1.markDone();
      todo2.markDone();
      expect(list.isDone()).not.toBeTruthy();
    });
  });

  describe('add(todo)', () => {
    test('should throw a TypeError', () => {
      expect(() => {
        list.add('boo');
      }).toThrow(TypeError);
    });
    test('last element should be newTodo', () => {
      const newTodo = new Todo('do taxes');
      list.add(newTodo);
      expect(list.last()).toBe(newTodo);
    });
  });

  describe('itemAt(index)', () => {
    test('should throw a ReferenceError', () => {
      expect(() => {
        list.itemAt(-3.5);
      }).toThrow(ReferenceError);
    });
    test('should return todo2', () => {
      expect(list.itemAt(1)).toBe(todo2);
    });
  });

  describe('markDoneAt(index)', () => {
    test('should throw a ReferenceError', () => {
      expect(() => {
        list.markDoneAt(Math.PI);
      }).toThrow(ReferenceError);
    });
    test('todo1 should not be done', () => {
      expect(todo1.isDone()).not.toBeTruthy();
    });
    test('todo1 should be done', () => {
      list.markDoneAt(0);
      expect(todo1.isDone()).toBeTruthy();
    });
  });

  describe('markUndoneAt(index)', () => {
    test('should throw a ReferenceError', () => {
      expect(() => {
        list.markUndoneAt(Math.PI);
      }).toThrow(ReferenceError);
    });
    test('todo1 should be done', () => {
      todo1.markDone();
      expect(todo1.isDone()).toBeTruthy();
    });
    test('todo1 should not be done', () => {
      todo1.markDone();
      list.markUndoneAt(0);
      expect(todo1.isDone()).not.toBeTruthy();
    });
  });

  describe('markAllDone()', () => {
    test('all todos shouldbe not done', () => {
      expect(list.toArray().every(todo => todo.isDone() === false))
        .toBeTruthy();
    });
    test('all todos should be done', () => {
      list.markAllDone();
      expect(list.toArray().every(todo => todo.isDone() === true))
        .toBeTruthy();
    });
  });

  describe('removeAt(index)', () => {
    test('should throw a ReferenceError', () => {
      expect(() => {
        list.removeAt(-Infinity);
      }).toThrow(ReferenceError);
    });
    test('should return an array wihtout todo2', () => {
      list.removeAt(1);
      expect(list.toArray()).toEqual([todo1, todo3]);
    });
    test('should return todo2', () => {
      expect(list.removeAt(1)).toBe(todo2);
    });
  });

  describe('toString()', () => {
    test('should return string representation of the list', () => {
      let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
      expect(list.toString()).toBe(string);
    });
    test('should return string representation of the list with todo2 marked done', () => {
      let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;
      todo2.markDone();
      expect(list.toString()).toBe(string);
    });
    test('should return string representation of the list with all todos marked done', () => {
      let string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;
      list.markAllDone();
      expect(list.toString()).toBe(string);
    });
  });

  describe('forEach(callback)', () => {
    test('should return an array of titles', () => {
      const titles = [];
      list.forEach(todo => titles.push(todo.title));
      expect(titles).toEqual(['Buy milk', 'Clean room', 'Go to the gym']);
    });
  });

  describe('filter(callback)', () => {
    test('should return an array with todo2 and todo3', () => {
      expect(list
        .filter(todo => todo.title.toLowerCase().includes('e'))
        .toArray())
        .toEqual([todo2, todo3]);
    });
  });
});