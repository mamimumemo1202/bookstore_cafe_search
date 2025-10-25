import { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { BackButton } from '../components/common/BackButton';

const TABS = [
  { key: 'signin', label: 'ログイン' },
  { key: 'signup', label: '新規登録' },
];

export function AuthPage() {
  const [tab, setTab] = useState('signin');

  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="max-w-xl mx-auto">
        <div className="flex justify-center">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              onClick={() => setTab(t.key)}
              className={[
                'px-6 py-3 text-sm font-semibold rounded-t-xl',
                tab === t.key
                  ? 'bg-primary-600 text-primary-50 shadow-sm'
                  : 'bg-primary-100 text-primary-500 hover:text-gray-700',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className=" w-full max-w-xl mx-auto px-4 ">
          <div className="rounded-xl shadow-sm">
            <section role="tabpanel" hidden={tab !== 'signin'}>
              <SignInForm />
            </section>
            <section role="tabpanel" hidden={tab !== 'signup'}>
              <SignUpForm />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
