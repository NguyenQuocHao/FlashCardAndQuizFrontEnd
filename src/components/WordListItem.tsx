import React from "react";
import "../style.css";

interface ListItemProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
  key: number;
  type: string;
}

export const cardTypes = {
  word: "word",
  cardBare: "card",
  // cardHighlighted: "card highlighted",
};

export const cardTypesArray = Object.keys(cardTypes).map((key) => ({
  value: key,
  label: cardTypes[key],
}));

const getListItemClassName = (type: string) => {
  switch (type) {
    case cardTypes.cardBare:
      return "card-Style";
    default:
      return "";
  }
};

const WordListItem: React.FC<ListItemProps> = ({
  text,
  onClick,
  selected = false,
  type = cardTypes.cardBare,
}) => {
  return (
    <a href={`/edit-flashcard/${text}`}>
      <div
        onClick={onClick}
        className={getListItemClassName(type)}
        tabIndex={onClick ? 0 : -1}
        aria-selected={selected}
      >
        {text}
      </div>
    </a>
  );
};

export default WordListItem;
