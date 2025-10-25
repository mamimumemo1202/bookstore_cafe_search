export function SignOutButton({ handleSignOut }) {
  return (
    <>
      <button
        type="button"
        className="my-10 mx-5 p-2 rounded-full bg-primary-600 text-primary-100 hover:bg-primary-400"
        onClick={() => handleSignOut()}
      >
        ログアウト
      </button>
    </>
  );
}
