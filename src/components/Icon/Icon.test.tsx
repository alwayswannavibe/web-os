// Libraries
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import * as useApp from 'src/hooks/useApp';
import * as useDragNDrop from 'src/hooks/useDragNDrop';

// Components
import { Icon } from '.';

describe('Icon', () => {
  const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    apps: {
      appsState: {
        [Apps.Calculator]: {
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
        <Icon type={Apps.Calculator} imgSource="" />
      </Provider>,
    );

    expect(document.getElementsByTagName('img')).toHaveLength(1);
    expect(document.getElementsByTagName('button')).toHaveLength(1);
    expect(screen.queryByText(Apps.Calculator)).toBeInTheDocument();
  });
});
