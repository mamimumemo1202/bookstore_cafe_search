export function SignOutButton({ handleSignOut }) {
  return (
    <>
      <button
        type="button"
        className="btn rounded-ful"
        onClick={() => handleSignOut()}
      >
        ログアウト
      </button>
    </>
  );
}
