'use strict'
/*
  - Big Picture: Create a custom set: behaves like a set of unique elements
    - class CustomSet
      - constructor():
      - empty: returns true if the set contains no elements
      - contains: sets can report if they contain an element
      - subset: a set is a subset if all of its elements are contained in the other set
      - disjoint: sets are disjoint if they share no elements
      - isSame: sets with the same elements are equal
      - add: unique elements can be added to a set
      - intersection: returns a set of all shared elements
      - difference of a set is a set of all elements that are only in the first set
      - union: returns a set of all elements in either set

  - Implementation:

  - Boundary values, edge cases, assumptions:
    - all elements of a set must be numbers
    - no duplicates
 */

class CustomSet{
  constructor(arr = []){
    this.set = arr;
  }

  isEmpty(){
    return this.set.length === 0;
  }

  contains(potentialElement){
    return this.set.some(element => element === potentialElement);
  }

  isSubset(set){
    return this.set.every(element => set.contains(element));
  }

  isDisjoint(set){
    return this.set.every(element => !set.contains(element));
  }

  isSame(set){
    return this.isSubset(set) && set.isSubset(this);
  }

  add(element){
    if(!this.contains(element)){
      this.set.push(element);
    }
    return this;
  }

  intersection(set){
    return new CustomSet(this.set.filter(element => set.contains(element)));
  }

  difference(set){
    return new CustomSet(this.set.filter(element => !set.contains(element)));
  }

  union(set){
    return new CustomSet([...this.getElements(), ...set.getElements()]);
  }

  getElements(){
    return this.set.slice();
  }

module.exports = CustomSet;