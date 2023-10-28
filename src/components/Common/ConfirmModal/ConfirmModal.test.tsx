import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ConfirmModal from './ConfirmModal';

const testData = {
  id: 'idValue',
  title: 'ConfirmModalTitle',
  onConfirm: jest.fn().mockImplementation(() => {}),
  text: 'Base Text',
  description: 'Description Words, many go here, blah blah blah.',
};

describe('ConfirmModal', () => {
  test('Modal Check For Expected Text, Trigger onConfirm Function', () => {
    render(
    <ConfirmModal
        id={testData.id}
        onConfirmChanges={testData.onConfirm}
        confirmChangesTitle={testData.title}
        confirmChangeText={testData.text}
        confirmChangesDescription={testData.description}
    />
    );
    expect(testData.onConfirm as jest.Mock).not.toHaveBeenCalled();
    expect(screen.queryByText(testData.title)).toBeInTheDocument();
    expect(screen.queryByText(testData.text)).toBeInTheDocument();
    expect(screen.queryByText(testData.description)).toBeInTheDocument();
    userEvent.click(screen.getByText('Confirm'));
    expect(testData.onConfirm as jest.Mock).toHaveBeenCalled();
  });
});