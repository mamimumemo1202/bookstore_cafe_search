import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from '../components/contexts/ModalContext';
import { AuthProvider } from '../components/contexts/AuthContext';
import { LoadingProvider } from '../components/contexts/LoadingContext';
import { render, screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, afterEach, it } from 'vitest';
import { HomePage } from '../pages/HomePage';

afterEach(() => cleanup());

function renderHome() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <LoadingProvider>
            <HomePage />
          </LoadingProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('/', () => {
  it('ホームページが表示される', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <LoadingProvider>
              <HomePage />
            </LoadingProvider>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it('ヘッダーが表示される', () => {
    renderHome();
    expect(screen.getByRole('banner')).toBeTruthy();
  });

  it('フッターが表示される', () => {
    renderHome();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('検索を押すとSearchModalが表示される', async () => {
    renderHome();
    const nav = screen.getByRole('navigation');
    const button = within(nav).getByRole('button', { name: '検索' });
    await userEvent.click(button);

    // ホームとモーダルの２こ
    expect(screen.getAllByText(/住所・.*からさがす/)).toHaveLength(2);
  });
});
