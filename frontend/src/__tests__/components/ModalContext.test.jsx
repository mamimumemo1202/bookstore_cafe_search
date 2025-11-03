import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, it, afterEach, expect } from 'vitest';
import { ModalProvider, useModal } from '../../components/contexts/ModalContext';

function ModalConsumer() {
  const { isOpenModal, openModal, closeModal } = useModal();

  return (
    <div>
      <p data-testid="modal-state">{isOpenModal ? 'open' : 'closed'}</p>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <button type="button" onClick={closeModal}>
        Close modal
      </button>
    </div>
  );
}

describe('ModalProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('provides open/close helpers that toggle the modal state', async () => {
    render(
      <ModalProvider>
        <ModalConsumer />
      </ModalProvider>
    );

    const state = screen.getByTestId('modal-state');
    expect(state).toHaveTextContent('closed');

    await userEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    expect(state).toHaveTextContent('open');

    await userEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(state).toHaveTextContent('closed');
  });
});
