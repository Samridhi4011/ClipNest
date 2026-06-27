import { Trash2, Copy } from "lucide-react";

type ClipboardCardProps = {
  text: string;
  time: string;
  onDelete: () => void;
  onCopy: () => void;
};

function ClipboardCard({
  text,
  time,
  onDelete,
  onCopy,
}: ClipboardCardProps) {
  return (
    <div className="clipboard-card">
      <div className="card-top">
        <h2>{text}</h2>

        <div className="card-actions">
          <button
            className="icon-btn"
            onClick={onCopy}
          >
            <Copy size={20} />
          </button>

          <button
            className="icon-btn delete-btn"
            onClick={onDelete}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <p>{time}</p>
    </div>
  );
}

export default ClipboardCard;