import "./ActionButton.css";

const ActionButton = ({
  text,
  icon,
  onClick,
  className = "",
}: {
  text: string;
  icon: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div className={"home__action " + className} onClick={onClick}>
      <p>{text}</p>
      <i className={`bx ${icon}`} />
    </div>
  );
};

export default ActionButton;
