import store from 'redux/store';
import {
  changeTerminalCoord,
  changeTerminalIconCoord,
  closeTerminal,
  openTerminal,
  toggleCollapseTerminal,
} from './terminalSlice';

describe('terminal slice', () => {
  it('opens then calls openTerminal', () => {
    store.dispatch(openTerminal());
    expect(store.getState().terminal.isTerminalOpen).toEqual(true);
    store.dispatch(closeTerminal());
  });

  it('closes then calls closeTerminal', () => {
    store.dispatch(openTerminal());
    store.dispatch(closeTerminal());
    expect(store.getState().terminal.isTerminalOpen).toEqual(false);
  });

  it('toggles collapse then calls toggleCollapseTerminal', () => {
    store.dispatch(openTerminal());
    store.dispatch(toggleCollapseTerminal());
    expect(store.getState().terminal.isTerminalCollapsed).toEqual(true);
    store.dispatch(toggleCollapseTerminal());
    expect(store.getState().terminal.isTerminalCollapsed).toEqual(false);
    store.dispatch(closeTerminal());
  });

  it('changes coordinates then calls changeTerminalCoord', () => {
    store.dispatch(
      changeTerminalCoord({
        top: '23px',
        left: '250px',
      }),
    );
    expect(store.getState().terminal.terminalLeftCoord).toEqual('250px');
    expect(store.getState().terminal.terminalTopCoord).toEqual('23px');
    store.dispatch(
      changeTerminalCoord({
        top: '13rem',
        left: '1.5rem',
      }),
    );
  });

  it('changes icon coordinates then calls changeTerminalIconCoord', () => {
    store.dispatch(
      changeTerminalIconCoord({
        top: '210px',
        left: '750px',
      }),
    );
    expect(store.getState().terminal.terminalIconLeftCoord).toEqual('750px');
    expect(store.getState().terminal.terminalIconTopCoord).toEqual('210px');
    store.dispatch(
      changeTerminalIconCoord({
        top: '15rem',
        left: '8rem',
      }),
    );
  });
});

export {};
