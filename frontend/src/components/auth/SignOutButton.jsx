export function SignOutButton({ handleSignOut }) {
  return (
    <>
      <button
        type="button"
        className="btn rounded-full hover:bg-primary-400"
        onClick={() => handleSignOut()}
      >
        ログアウト
      </button>
    </>
  );
}
