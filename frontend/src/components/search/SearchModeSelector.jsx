export function SearchModeSelector({ setSearchMode, searchMode }) {
  return (
    <>
      <div className="flex gap-3">
        <label>
          <input
            type="radio"
            name="searchMode"
            value="bookstore"
            checked={searchMode === 'bookstore'}
            onChange={(e) => setSearchMode(e.target.value)}
            className="radio radio-xs"
          />
          本屋
        </label>

        <label>
          <input
            type="radio"
            name="searchMode"
            value="cafe"
            checked={searchMode === 'cafe'}
            onChange={(e) => setSearchMode(e.target.value)}
            className="radio radio-xs"
          />
          カフェ
        </label>
      </div>
    </>
  );
}
