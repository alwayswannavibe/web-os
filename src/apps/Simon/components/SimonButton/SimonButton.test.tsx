// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { RefObject } from 'react';
import userEvent from '@testing-library/user-event';

// Types
import { SimonStatus } from 'src/types/simonStatus';

// Components
import { SimonButton } from '.';

describe('SimonButton', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);

  it('should render component with disabled button', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Showing,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const handleClick = jest.fn();
    render(
      <Provider store={mockStoreWithState}>
        <SimonButton btnRef={null as unknown as RefObject<HTMLButtonElement>} btnNumber={1} numberOfButtons={4} handleClick={handleClick} />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    expect(button).toBeInTheDocument();
    expect((button as HTMLButtonElement).disabled).toEqual(true);
    expect(document.getElementsByClassName('btn4')).toHaveLength(1);
  });

  it('should render component with active button', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Playing,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const handleClick = jest.fn();
    render(
      <Provider store={mockStoreWithState}>
        <SimonButton btnRef={null as unknown as RefObject<HTMLButtonElement>} btnNumber={1} numberOfButtons={4} handleClick={handleClick} />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    expect(button).toBeInTheDocument();
    expect((button as HTMLButtonElement).disabled).toEqual(false);
    expect(document.getElementsByClassName('btn4')).toHaveLength(1);
  });

  it('should render component if numberOfButtons equals 9', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Playing,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const handleClick = jest.fn();
    render(
      <Provider store={mockStoreWithState}>
        <SimonButton btnRef={null as unknown as RefObject<HTMLButtonElement>} btnNumber={1} numberOfButtons={9} handleClick={handleClick} />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    expect(button).toBeInTheDocument();
    expect((button as HTMLButtonElement).disabled).toEqual(false);
    expect(document.getElementsByClassName('btn4')).toHaveLength(0);
    expect(document.getElementsByClassName('btn9')).toHaveLength(1);
  });

  it('should calls handleClick when click on button', () => {
    const initialState = {
      simon: {
        simonStatus: SimonStatus.Playing,
      },
    };
    const mockStoreWithState = mockStore(initialState);
    const handleClick = jest.fn();
    render(
      <Provider store={mockStoreWithState}>
        <SimonButton btnRef={null as unknown as RefObject<HTMLButtonElement>} btnNumber={1} numberOfButtons={9} handleClick={handleClick} />
      </Provider>,
    );

    const button = document.getElementsByTagName('button')[0];

    userEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalledWith(1);
  });
});
