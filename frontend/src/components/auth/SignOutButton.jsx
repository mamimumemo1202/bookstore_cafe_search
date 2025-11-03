export function SignOutButton({ handleSignOut }) {
  return (
    <>
      <button type="button" className="btn" onClick={() => handleSignOut()}>
        ログアウト
      </button>
    </>
  );
}
