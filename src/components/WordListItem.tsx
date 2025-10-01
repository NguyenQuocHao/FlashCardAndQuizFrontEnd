import React from "react";

interface ListItemProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
  key: number;
}

const WordListItem: React.FC<ListItemProps> = ({
  text,
  onClick,
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        backgroundColor: selected ? "#e0e0e0" : "transparent",
        padding: "8px 16px",
        borderRadius: "4px",
        marginBottom: "4px",
        transition: "background 0.2s",
      }}
      tabIndex={onClick ? 0 : -1}
      aria-selected={selected}
    >
      <a href={`/edit-flashcard/${text}`}>{text}</a>
    </div>
  );
};

export default WordListItem;
