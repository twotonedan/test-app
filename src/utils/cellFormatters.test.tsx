import React from 'react';
import '@testing-library/jest-dom';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { ButtonCellFormatter, LinkCellFormatter } from './cellFormatters';

describe('Cell Formatters', () => {
  test('ButtonCellFormatter', () => {
    const ButtonCell = ButtonCellFormatter({
      onClick: () => { },
      dataProps: {
        row: [],
        value: 'test'
      }
    });
    const expected = <Button
      style={{ "height": "25px" }}
      onClick={() => { }}
      variant="outlined">
      test
    </Button>
    expect(ButtonCell.toString()).toBe(expected.toString());
  });
  test('LinkCellFormatter', () => {
    const LinkCell = LinkCellFormatter({
      url: '/test',
      dataProps: {
        row: [],
        value: 'test link'
      }
    });
    const expected = <Link href="/test">test link</Link>
    expect(LinkCell.toString()).toBe(expected.toString());
  });
});
