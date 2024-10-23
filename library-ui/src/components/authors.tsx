interface ViewAuthorProps {
    handleContent: (type: string) => void;
  }
  
  export default function ViewAuthor({ handleContent }: ViewAuthorProps) {
    function handleViewAuthors() {
      handleContent('authors');
    }
  
    return (
      <button onClick={handleViewAuthors}>View Authors</button>
    );
  }
  