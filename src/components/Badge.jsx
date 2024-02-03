function Badge({ text, type }) {
  let colors;
  if (type === 'todo') {
    colors = 'bg-gray-300';
  }
  if (type === 'in-progress') {
    colors = 'bg-yellow-300 text-yellow-700';
  }
  if (type === 'done') {
    colors = 'bg-green-300 text-green-700';
  }

  return (
    <span className={`rounded px-2 text-base font-bold ${colors}`}>{text}</span>
  );
}

export default Badge;
