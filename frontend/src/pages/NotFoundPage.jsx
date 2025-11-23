import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { FooterNavigation } from '../components/layout/FooterNavigation';



export function NotFoundPage () {
    const navigate = useNavigate();

    return(
        <div>
            <Header variant="home" />
            <div className='pt-18 flex flex-col items-center'>
            <div className='m-2'>ページが見つかりません。</div>
            <div className='m-2'>URLを確認してください。</div>
            <button 
            className="btn m-2"
            type='button'
            onClick={() => {navigate('/')}}>ホームに戻る</button>
            </div>
            <FooterNavigation/>
        </div>
    )
}