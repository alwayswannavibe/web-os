// Libraries
import { render } from '@testing-library/react';

// Types
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

// Components
import { BackgroundOption } from '.';

describe('BackgroundOption', () => {
  it('should render correctly', () => {
    render(
      <BackgroundOption value={BackgroundImage.Tree} />,
    );

    const option = document.querySelector('option');

    expect(option).toBeInTheDocument();
    expect(option!.value).toEqual(BackgroundImage.Tree);
    expect(option!.textContent).toEqual(BackgroundImage.Tree);
  });
});
