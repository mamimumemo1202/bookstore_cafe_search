export function SignOutButton({ handleSignOut, isSigningOut }) {
  return (
    <>
      <button type="button" className="btn" onClick={() => handleSignOut()}>
        {isSigningOut? "ログアウト中..." : "ログアウト"}
      </button>
    </>
  );
}
