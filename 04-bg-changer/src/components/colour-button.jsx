export const ColourButton = ({ value, label, onClick }) => {
  let textColor = "black";
  if (value === "black") {
    textColor = "white";
  } 
  return (
    <button
      className={`h-8 rounded-sm mx-2 my-2 px-4`}
      style={{ backgroundColor: value, color: textColor }}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};
