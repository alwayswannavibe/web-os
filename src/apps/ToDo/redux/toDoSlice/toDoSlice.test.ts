// Redux
import store from 'src/redux/store';
import { addToDoItem, clearToDo, deleteToDoItem, toggleCompleteToDoItem } from './toDoSlice';

describe('to do slice', () => {
  it('add to-do item then calls addToDoItem', () => {
    store.dispatch(addToDoItem('get one'));
    expect(store.getState().toDo.toDoList).toHaveLength(1);
    expect(store.getState().toDo.toDoList[0].text).toBe('get one');
    expect(store.getState().toDo.toDoList[0].id).toBeDefined();
    store.dispatch(addToDoItem('get two'));
    expect(store.getState().toDo.toDoList).toHaveLength(2);
    expect(store.getState().toDo.toDoList[1].text).toBe('get two');
    expect(store.getState().toDo.toDoList[1].id).toBeDefined();
    store.dispatch(clearToDo());
  });

  it('delete to do item then calls deleteToDoItem with reverse order', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList[0].text).toBe('get two');
    expect(store.getState().toDo.toDoList[0].id).toBeDefined();
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList).toHaveLength(0);
  });

  it('delete to-do item then calls deleteToDoItem with not reverse order', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[1].id));
    expect(store.getState().toDo.toDoList[0].text).toBe('get one');
    expect(store.getState().toDo.toDoList[0].id).toBeDefined();
    expect(store.getState().toDo.toDoList[0].completed).toBe(false);
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList).toHaveLength(0);
  });

  it('clear to-do list then calls clearToDo', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(clearToDo());
    expect(store.getState().toDo.toDoList).toHaveLength(0);
  });

  it('toggle complete of to-do item then calls toggleCompleteToDoItem', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(toggleCompleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList[0].completed).toBe(true);
    store.dispatch(toggleCompleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList[0].completed).toBe(false);
    store.dispatch(toggleCompleteToDoItem(store.getState().toDo.toDoList[1].id));
    expect(store.getState().toDo.toDoList[1].completed).toBe(true);
    store.dispatch(clearToDo());
  });
});

export {};
