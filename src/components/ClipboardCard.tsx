type ClipboardCardProps = {
  text: string;
  time: string;
};

function ClipboardCard({ text, time }: ClipboardCardProps) {
  return (
    <div className="card">
      <h3>{text}</h3>
      <p>{time}</p>
    </div>
  );
}

export default ClipboardCard;