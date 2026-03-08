import "./ActionButton.css";

const ActionButton = ({
  text,
  icon,
  onClick,
  className = "",
  highlight = false,
}: {
  text: string;
  icon: string;
  onClick: () => void;
  className?: string;
  highlight?: boolean;
}) => {
  return (
    <div
      className={
        "home__action " +
        className +
        (highlight ? " home__actionHighlight" : "")
      }
      onClick={onClick}
    >
      <p>{text}</p>
      <i className={`bx ${icon}`} />
    </div>
  );
};

export default ActionButton;
