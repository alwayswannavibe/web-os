// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// Enums
import { App } from '@Enums/app.enum';

// Hooks
import * as useApp from '@Hooks/useApp/useApp';
import * as useDragNDrop from '@Hooks/useDragNDrop/useDragNDrop';

// Components
import { Icon } from './Icon';

describe('Icon', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    apps: {
      appsState: {
        [App.Calculator]: {
          iconPos: {
            top: '1rem',
            left: '1rem',
          },
        },
      },
    },
  };
  const mockStoreWithState = mockStore(initialState);

  beforeEach(() => {
    jest.spyOn(useApp, 'useApp').mockReturnValue({
      getAppIndex: jest.fn().mockReturnValue(1),
      handleClose: jest.fn(),
      handleToggleCollapse: jest.fn(),
      handleOpen: jest.fn(),
      isIncludeApp: jest.fn(),
    });
    jest.spyOn(useDragNDrop, 'useDragNDrop').mockReturnValue({
      startDrag: jest.fn(),
      newCoords: {
        top: '1rem',
        left: '1rem',
      },
    });
  });

  it('should render', () => {
    render(
      <Provider store={mockStoreWithState}>
        <Icon type={App.Calculator} imgSource="" />
      </Provider>,
    );

    expect(document.getElementsByTagName('img')).toHaveLength(1);
    expect(document.getElementsByTagName('button')).toHaveLength(1);
    expect(screen.queryByText(App.Calculator)).toBeInTheDocument();
  });
});
