import {
  Star,
  StarOff,
  Pencil,
  Copy,
  Trash2,
  Check,
} from "lucide-react";
type Props = {
  text: string;
  time: string;
  createdAt: number;
  favorite: boolean;
  isCopied: boolean;
  onCancel: () => void;
  isEditing: boolean;
  onSave: () => void;

  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;

  onFavorite: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

function ClipboardCard({
  text,
  time,
  createdAt,
  favorite,
  isCopied,
  isEditing,
  editText,
  onSave,
  setEditText,
  onCancel,
  onFavorite,
  onCopy,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="clipboard-card">
      <div className="card-top">
        <div>
          {isEditing ? (
            <input
                className="edit-input"
                value={editText}
                autoFocus
                onFocus={(e) => e.target.select()}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSave();
                    }

                    if (e.key === "Escape") {
                        setEditText(text);
                        onCancel();
                    }
                }}
            />      
        ) : (
        <h2>{text}</h2>
    )}
          <p
            title={`Created on ${new Date(createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}`}
          >
            {time}
          </p>
        </div>

        <div className="card-actions">
          <button
            className="favorite-btn"
            onClick={onFavorite}
          >
            <Star
              size={22}
              fill={favorite ? "#FFD43B" : "none"}
              color={favorite ? "#FFD43B" : "#9ca3af"}
            />
          </button>

          {isEditing ? (
            <button
                className="save-btn"
                onClick={onSave}
            >
                <Check size={22} />
            </button>
        ) : (
        <button
            className="edit-btn"
            onClick={onEdit}
        >
            <Pencil size={22} />
        </button>
    )}

          <button
            className="copy-btn"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check size={20} color="#22c55e" />
            ) : (
              <Copy size={20} />
            )}
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