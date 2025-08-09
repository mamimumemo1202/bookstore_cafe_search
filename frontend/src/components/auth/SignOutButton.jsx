
export function SignOutButton({ handleSignOut }){

    return (
        <>
        <button 
        type="button"
        className="bg-red-500 hover:bg-red-400"
        onClick={()=>handleSignOut()}>
            ログアウト
        </button>
        </>
    )
}