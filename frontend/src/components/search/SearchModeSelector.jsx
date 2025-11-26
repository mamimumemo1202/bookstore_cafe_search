export function SearchModeSelector({ setSearchMode, searchMode, name }) {
  return (
    <>
      <div className="flex gap-3">
        <label>
          <input
            type="radio"
            name={name}
            value="bookstore"
            checked={searchMode === 'bookstore'}
            onChange={(e) => setSearchMode(e.target.value)}
            className="radio radio-xs radio-primary"
          />
          本屋
        </label>

        <label>
          <input
            type="radio"
            name={name}
            value="cafe"
            checked={searchMode === 'cafe'}
            onChange={(e) => setSearchMode(e.target.value)}
            className="radio radio-xs radio-primary"
          />
          カフェ
        </label>
      </div>
    </>
  );
}
