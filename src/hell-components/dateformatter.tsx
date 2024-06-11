export default function Date({ date }) {
  let dater = date as Date;

  return (
    <time datetime={dater.toISOString()}>
      {dater.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
}
