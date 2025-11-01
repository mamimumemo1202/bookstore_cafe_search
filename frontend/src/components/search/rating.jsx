export function Rating({ rating }) {
  if (rating == null) return <p>評価がありません</p>;

  let activeCount = 0;

  if (rating >= 4.5) {
    activeCount = 5;
  } else if (rating >= 4.0) {
    activeCount = 4;
  } else if (rating >= 3.0) {
    activeCount = 3;
  } else if (rating >= 2.0) {
    activeCount = 2;
  } else if (rating >= 1.0) {
    activeCount = 1;
  }

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <div
          key={value}
          className={`mask mask-star ${value <= activeCount ? 'bg-orange-400' : 'bg-base-300'}`}
          aria-label={`${value} star`}
          aria-current={value === activeCount ? 'true' : undefined}
        />
      ))}
    </div>
  );
}
