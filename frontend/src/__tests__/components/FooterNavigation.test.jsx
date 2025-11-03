import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { FooterNavigation } from '../../components/layout/FooterNavigation';

const navigateMock = vi.fn();
const openModalMock = vi.fn();
let authValue = { isLoggedIn: false };

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

vi.mock('../../components/contexts/AuthContext', () => ({
  useAuthContext: () => authValue,
}));

vi.mock('../../components/contexts/ModalContext', () => ({
  useModal: () => ({ openModal: openModalMock }),
}));

describe('FooterNavigation', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    openModalMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('フッターが表示される', () => {
    render(<FooterNavigation />);
    expect(screen.getByRole('navigation', { name: 'footer navigation' })).toBeInTheDocument();
  });

  it('クリックすると検索モーダルが表示される', async () => {
    render(<FooterNavigation />);
    const searchButton = screen.getByRole('button', { name: '検索' });

    await userEvent.click(searchButton);

    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('未ログイン時にマイページ、マイリストを押すと/authに遷移する', async () => {
    authValue = { isLoggedIn: false };
    render(<FooterNavigation />);
    const mypage = screen.getByRole('button', { name: 'マイページ' });
    const mylist = screen.getByRole('button', { name: 'マイリスト' });

    await userEvent.click(mypage);
    expect(navigateMock).toHaveBeenCalledWith('/auth');
    await userEvent.click(mylist);
    expect(navigateMock).toHaveBeenCalledWith('/auth');
  });

  it('ログインユーザがマイページ、マイリストを押すとそれぞれ画面に遷移する', async () => {
    authValue = { isLoggedIn: true };

    render(<FooterNavigation />);
    const mypage = screen.getByRole('button', { name: 'マイページ' });
    const mylist = screen.getByRole('button', { name: 'マイリスト' });

    await userEvent.click(mypage);
    expect(navigateMock).toHaveBeenCalledWith('/mypage');
    await userEvent.click(mylist);
    expect(navigateMock).toHaveBeenCalledWith('/mylist');
  });
});
