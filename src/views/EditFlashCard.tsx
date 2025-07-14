export const EditFlashCard = () => {
    return (
        <div className="edit-flashcard">
            <h2>Edit Flash Card</h2>
            {/* Form for editing flash card details will go here */}
            <form>
                <label>
                    Word:
                    <input type="text" name="word" />
                </label>
                <label>
                    Definition:
                    <textarea name="definition"></textarea>
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}