interface FlashCardProps {
  word: Word;
}

interface Word {
  text: string;
  definitions: WordDefinition[];
}

interface WordDefinition {
  definition: string;
  example: string;
  difficulty: number;
  frequency: number;
  register: number;
  tags: string[];
}

export const FlashCard = (props: FlashCardProps) => {
  const word: Word = props.word;

  return (
    <div className="flashcard">
      <div><h2>{word.text}</h2></div>
      <div>{word.definitions.map(def => {
        return (
          <div key={def.definition} className="definition">
            <p>{def.definition}</p>
            <p><strong>Example:</strong> {def.example}</p>
            <p><strong>Difficulty:</strong> {def.difficulty}</p>
            <p><strong>Frequency:</strong> {def.frequency}</p>
            <p><strong>Register:</strong> {def.register}</p>
            <p><strong>Tags:</strong> {def.tags.join(', ')}</p>
          </div>
        )
      })}</div>
    </div>
  );
}