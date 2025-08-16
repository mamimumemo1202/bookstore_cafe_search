import { BackButton } from "../components/common/BackButton";

// mode = forget: 未ログインユーザPWリセット mode=change: ログインユーザのPW変更
export function PasswordResetPage({ mode }){

    const handlePasswordReset = (e) =>{
        e.preventDefault();
         console.log("TODO:Rails側も含めたリセット処理")}

    return(
    <>
    <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
    <BackButton/>
    </div>

    <form 
    onSubmit={handlePasswordReset}
    className="flex flex-col pt-10">
      {mode === "forget" && (
        <input
        type="password"
        name="current_password"
        className="my-2 mx-5 p-2 shadow-sm rounded-full"
        placeholder="現在のパスワード"/>)}

        <input
        type="password"
        name="new-password"
        className="my-2 mx-5 p-2 shadow-sm rounded-full"
        placeholder="新しいパスワード"/>

        <input
        type="password"
        name="new-password"
        className="my-2 mx-5 p-2 shadow-sm rounded-full"
        placeholder="新しいパスワード（確認）"/>

        <button 
        type="submit"
        className="my-6 mx-5 p-2 rounded-full bg-green-400">パスワードを更新</button>
      </form> 
    </>
    )

}