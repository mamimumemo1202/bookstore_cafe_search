
export function SignOutButton({ handleSignOut }){

    return (
        <>
        <button 
        type="button"
        className="my-10 mx-5 p-2 rounded-full bg-red-500 hover:bg-red-400"
        onClick={()=>handleSignOut()}>
            ログアウト
        </button>
        </>
    )
}