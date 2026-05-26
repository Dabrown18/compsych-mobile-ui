import React, { useContext } from 'react';

import { Text } from 'react-native';

import { render } from '@testing-library/react-native';

import { sys } from '../../tokens';
import { ThemeContext } from '../ThemeContext';
import { ThemeProvider } from '../ThemeProvider';

function ThemeConsumer() {
  const theme = useContext(ThemeContext);
  return (
    <Text testID="primary-color">
      {theme.colorRoles.accent.primary.sysPrimary}
    </Text>
  );
}

describe('ThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Text>hello</Text>
      </ThemeProvider>,
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('provides the GuidanceNow default theme when no override is given', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('primary-color').props.children).toBe(
      sys.colorRoles.accent.primary.sysPrimary,
    );
  });

  it('provides the merged custom theme when an override is supplied', () => {
    const { getByTestId } = render(
      <ThemeProvider
        theme={{
          colorRoles: { accent: { primary: { sysPrimary: '#c00000' } } },
        }}
      >
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('primary-color').props.children).toBe('#c00000');
  });

  it('keeps default values for tokens not included in the override', () => {
    function ErrorColorConsumer() {
      const theme = useContext(ThemeContext);
      return (
        <Text testID="error-color">{theme.colorRoles.error.sysError}</Text>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider
        theme={{
          colorRoles: { accent: { primary: { sysPrimary: '#c00000' } } },
        }}
      >
        <ErrorColorConsumer />
      </ThemeProvider>,
    );
    expect(getByTestId('error-color').props.children).toBe(
      sys.colorRoles.error.sysError,
    );
  });

  it('works correctly when nested — inner provider wins', () => {
    function Consumer() {
      const theme = useContext(ThemeContext);
      return (
        <Text testID="color">{theme.colorRoles.accent.primary.sysPrimary}</Text>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider
        theme={{
          colorRoles: { accent: { primary: { sysPrimary: '#aaaaaa' } } },
        }}
      >
        <ThemeProvider
          theme={{
            colorRoles: { accent: { primary: { sysPrimary: '#bbbbbb' } } },
          }}
        >
          <Consumer />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(getByTestId('color').props.children).toBe('#bbbbbb');
  });
});
