import { render } from '@testing-library/react';
import React from 'react';
import Help from '../Help.container';

describe('Help', () => {
  it('should add default class', async () => {
    // Act
    const { asFragment } = await render(<Help>Help content</Help>);

    // Assert
    expect(
      asFragment().querySelector('.af-popover__wrapper > div')
    ).toHaveClass('af-popover__container', { exact: true });
  });

  it('should add modifier on custom class', async () => {
    // Act
    const { asFragment } = await render(
      <Help className="custom-class" classModifier="modifier">
        Help content
      </Help>
    );

    // Assert
    expect(
      asFragment().querySelector('.af-popover__wrapper > div')
    ).toHaveClass(
      'custom-class custom-class--modifier custom-class--modifier--modifier',
      { exact: true }
    );
  });
});
