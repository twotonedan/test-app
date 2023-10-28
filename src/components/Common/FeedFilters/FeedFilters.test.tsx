import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedFilters from './FeedFilters';

describe('FeedFilters', () => {
  test('renders component', () => {
    const props = {
      isMultiDay: true,
      baseName: 'baseName',
      resultsQuantity: 1
    }

    render(<FeedFilters {...props} />);
    expect(screen.queryByText('start')).toBeInTheDocument();
    expect(screen.queryByText('end')).toBeInTheDocument();
  });
});
