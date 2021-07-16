import store from 'src/redux/store';
import {
  addToDoItem,
  changeToDoCoord,
  changeToDoIconCoord,
  clearToDo,
  closeToDo,
  deleteToDoItem,
  openToDo,
  toggleCollapseToDo,
  toggleCompleteToDoItem,
} from '.';

describe('to do slice', () => {
  it('opens then calls openToDo', () => {
    store.dispatch(openToDo());
    expect(store.getState().toDo.isToDoOpen).toEqual(true);
    store.dispatch(closeToDo());
  });

  it('closes then calls closeToDo', () => {
    store.dispatch(openToDo());
    store.dispatch(closeToDo());
    expect(store.getState().toDo.isToDoOpen).toEqual(false);
  });

  it('toggles collapse then calls toggleCollapseToDo', () => {
    store.dispatch(openToDo());
    store.dispatch(toggleCollapseToDo());
    expect(store.getState().toDo.isToDoCollapsed).toEqual(true);
    store.dispatch(toggleCollapseToDo());
    expect(store.getState().toDo.isToDoCollapsed).toEqual(false);
    store.dispatch(closeToDo());
  });

  it('changes coordinates then calls changeToDoCoord', () => {
    store.dispatch(
      changeToDoCoord({
        top: '23px',
        left: '250px',
      }),
    );
    expect(store.getState().toDo.toDoLeftCoord).toEqual('250px');
    expect(store.getState().toDo.toDoTopCoord).toEqual('23px');
    store.dispatch(
      changeToDoCoord({
        top: '10rem',
        left: '35rem',
      }),
    );
  });

  it('changes icon coordinates then calls changeToDoIconCoord', () => {
    store.dispatch(
      changeToDoIconCoord({
        top: '210px',
        left: '750px',
      }),
    );
    expect(store.getState().toDo.toDoIconLeftCoord).toEqual('750px');
    expect(store.getState().toDo.toDoIconTopCoord).toEqual('210px');
    store.dispatch(
      changeToDoIconCoord({
        top: '18rem',
        left: '3rem',
      }),
    );
  });

  it('add to do item then calls addToDoItem', () => {
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

  it('delete to do item then calls deleteToDoItem with not reverse order', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[1].id));
    expect(store.getState().toDo.toDoList[0].text).toBe('get one');
    expect(store.getState().toDo.toDoList[0].id).toBeDefined();
    expect(store.getState().toDo.toDoList[0].completed).toBe(false);
    store.dispatch(deleteToDoItem(store.getState().toDo.toDoList[0].id));
    expect(store.getState().toDo.toDoList).toHaveLength(0);
  });

  it('clear to do list then calls clearToDo', () => {
    store.dispatch(addToDoItem('get one'));
    store.dispatch(addToDoItem('get two'));
    store.dispatch(clearToDo());
    expect(store.getState().toDo.toDoList).toHaveLength(0);
  });

  it('toogle cpmplete of to do item then calls toggleCompleteToDoItem', () => {
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
