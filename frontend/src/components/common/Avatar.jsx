import defaultAvatar from '../../assets/default-avatar.svg';

// TODO: ユーザが任意のアイコンを設定できるように調整
export function Avatar() {
  const src = defaultAvatar;
  return <img src={src} alt="user avatar" className="w-full h-full rounded-full" />;
}
