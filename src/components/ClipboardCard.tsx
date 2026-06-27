type ClipboardCardProps = {
  text: string;
  time: string;
  onDelete: () => void;
};

function ClipboardCard({
  text,
  time,
  onDelete,
}: ClipboardCardProps) {
  return (
    <div className="clipboard-card">
      <div className="card-top">
        <h2>{text}</h2>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>

      <p>{time}</p>
    </div>
  );
}

export default ClipboardCard;