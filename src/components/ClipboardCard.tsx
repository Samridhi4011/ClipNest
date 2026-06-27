import { Trash2, Copy, Star } from "lucide-react";

type Props = {
  text: string;
  time: string;
  favorite: boolean;
  onFavorite: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

function ClipboardCard({
  text,
  time,
  favorite,
  onFavorite,
  onCopy,
  onDelete,
}: Props) {
  return (
    <div className="clipboard-card">
      <div className="card-top">
        <div>
          <h2>{text}</h2>
          <p>{time}</p>
        </div>

        <div className="card-actions">
          <button
            className="favorite-btn"
            onClick={onFavorite}
          >
            <Star
              size={20}
              fill={favorite ? "#facc15" : "none"}
              color={favorite ? "#facc15" : "#9ca3af"}
            />
          </button>

          <button
            className="copy-btn"
            onClick={onCopy}
          >
            <Copy size={20} />
          </button>

          <button
            className="delete-btn"
            onClick={onDelete}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClipboardCard;