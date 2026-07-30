import { ColourButton } from "./colour-button";

export const BgChangerBar = ({ onSelectColor }) => {
  return (
    <div className="with-full h-12 bg-transparent flex items-center justify-center mx-4 rounded-xl border-2 border-solid border-gray-400">
      <ColourButton value="red" label="red" onClick={onSelectColor} />
      <ColourButton value="blue" label="blue" onClick={onSelectColor} />
      <ColourButton value="cyan" label="cyan" onClick={onSelectColor} />
      <ColourButton value="olive" label="olive" onClick={onSelectColor} />
      <ColourButton value="pink" label="pink" onClick={onSelectColor} />
      <ColourButton value="yellow" label="yellow" onClick={onSelectColor} />
      <ColourButton value="black" label="black" onClick={onSelectColor} />
      <ColourButton value="green" label="green" onClick={onSelectColor} />
      <ColourButton value="purple" label="purple" onClick={onSelectColor} />
      <ColourButton value="orange" label="orange" onClick={onSelectColor} />
      <ColourButton value="teal" label="teal" onClick={onSelectColor} />
    </div>
  );
};
