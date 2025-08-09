import { SignUpForm } from '../components/auth/SignUpForm';
import { useAuthContext } from '../components/contexts/AuthContext';

export function Mypage(){

const { user, isLoggedIn} = useAuthContext();

    return(
        <>
        {isLoggedIn? 
        <div className='flex flex-col p-10'>
            <div className=''>{user.email}</div>
            <div className=''>{user.name}</div>            
        </div>
        : 
        <div className='p-20'>
        <SignUpForm/>
        </div>
        }
        </>
    )
}