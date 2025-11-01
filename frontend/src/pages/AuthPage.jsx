import { useEffect, useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { BackButton } from '../components/common/BackButton';
import { useLocation } from 'react-router-dom';


export function AuthPage() {
  const [notice, setNotice] = useState("")
  const location = useLocation()
  const params = new URLSearchParams(location.search)


 useEffect( () => {
  if(params.get("verified") === '1') { setNotice("認証が完了しました") } 
  // TODO: パスリセ完了後の遷移も調整
 },[location.search])

  return (
    <>
      <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton />
      </div>

      <div className="max-w-xl mx-auto">

        <div className="text-3xl text-center mb-2">さあ！始めましょう！</div>
        {notice && (<div className="mb-2 rounded alert alert-success">{notice}</div>)}
        
        <div className='tabs tabs-border justify-center px-5'>
          <input type="radio" name="auth" className="tab" aria-label="ログイン" defaultChecked />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <SignInForm />
          </div>
          <input type="radio" name="auth" className="tab" aria-label="新規登録" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <SignUpForm />
          </div>
        </div>
        
      </div>
    </>
  );
}
