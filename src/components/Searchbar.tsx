import React from "react";

interface SerachBarProps {
  exportSerachTerm: (searchTerm: string) => void;
  searchTerm: string;
}
const Searchbar: React.FC<SerachBarProps> = ({
  exportSerachTerm,
  searchTerm,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    exportSerachTerm(event.target.value);
  };
  return (
    <div>
      <input
        style={{
          width: "300px",
          height: "40px",
          border: "2px solid lightgray",
          borderRadius: "10px",
        }}
        value={searchTerm}
        onChange={(event) => handleInputChange(event)}
      />
    </div>
  );
};

export default Searchbar;
