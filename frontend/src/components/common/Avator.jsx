import defaultAvator from '../../assets/default-avatar.svg'

// TODO: ユーザが任意のアイコンを設定できるように調整
export function Avator({ user }){
    const src = defaultAvator
    return(
        <img src={src} alt="user avatar" className="w-full h-full rounded-full" />
    )
}