// Libraries
import { render } from '@testing-library/react';

// Features
import { BackgroundImage } from '@Features/theme/types/backgroundImage';

// Components
import { SettingsOption } from './SettingsOption';

describe('BackgroundOption', () => {
  it('should render correctly', () => {
    render(
      <SettingsOption value={BackgroundImage.Tree} category="Background" />,
    );

    const option = document.querySelector('option');

    expect(option).toBeInTheDocument();
    expect(option!.value).toEqual(BackgroundImage.Tree);
    expect(option!.textContent).toEqual('Background.Tree');
  });
});
