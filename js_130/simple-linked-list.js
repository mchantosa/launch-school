/*
- Big picture: Create a simple linked list
  - class SimpleLinkedList
    - constructor()
      - arguments: none
      - side effects: creat and empty storage space
        - this.list = [ ]
      - return: default
    - size()
    - push(data) intended to be an element, but can be anything
    - isEmpty()
  - class Element
    - constructor(data): 
      - arguments: data
      - side effects: 
        - store data
      - return: default
    - datum(): return data
    - isTail() default true
    - next() default none

- Implementation:
  - class Element
    - constructor(data, nextElement = null): 
      - arguments: data
      - side effects: 
        - store data
      - return: default
    - datum(): 
      - arguments: none
      - side effects: none
      - return: this data
    - isTail() default true
      - arguments: none
      - side effects: none
      - return: is this the last element
    - next() default none
      - arguments: none
      - return: this.nextElement

  - class SimpleLinkedList
    - constructor()
      - arguments: none
      - side effects: creat and empty storage space
        - this.list = [ ]
      - return: default
    - size()
      - argument: none
      - side effect: none
      - return: length of list
    - push(data) 
      - argument: anything
      - side effect: push data as an element to this.list
        - push new data as element, 
        - set last tail element to not tail
      - return: default
    - isEmpty()
      - argument: none
      - side efect: none
      - return: this.list.length === 0
    - peek()
      - argument: none
      - side effect: none
      - return: if empty null, else, top element's data
    - head()
      - argument: none
      - side effect: none
      - return: top element
  

- Boundary values, edge cases, and assumptions
  - the only argument so far is anything, there isn't really anything to bound
 */

class SimpleLinkedList{
  constructor(){
    this.list = [];
  }
  size(){
    return this.list.length;
  }
  push(data){
    this.list.push(new Element(data, this.head()))
  }
  isEmpty(){
    return this.list.length === 0
  }
  peek(){
    return (this.isEmpty()) ? null : this.list[this.size()-1].datum();
  }
  head(){
    return (this.isEmpty()) ? null : this.list[this.size()-1];
  }
  pop(){
    return this.list.pop().datum();
  }

  static fromArray(arr){
    const list = new SimpleLinkedList();
    if(arr) {
      arr.slice().reverse().forEach(element => list.push(element));
    }
    return list;
  }

  toArray(){
    const array = [];
    if(!this.isEmpty()) {
      this.list.reverse().forEach(element => array.push(element.datum()));
    }
    return array;
  }

  reverse(){
   return SimpleLinkedList.fromArray(this.toArray().reverse())
  }
  
}

class Element{
  constructor(data, nextElement = null){
    this.data = data;
    this.nextElement = nextElement;
    this.tail = !this.nextElement;
  } 
  datum(){
    return this.data;
  }
  isTail(){
    return this.tail;
  }
  next(){
    return this.nextElement;
  }
}

module.exports = {SimpleLinkedList, Element};