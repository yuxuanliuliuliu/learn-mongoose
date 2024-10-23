interface ViewBooksProps {
    handleContent: (type: string) => void;
  }
  
  export default function ViewBooks({ handleContent }: ViewBooksProps) {
    function handleViewBooks() {
      handleContent('books');
    }
  
    return (
      <button onClick={handleViewBooks}>View Books</button>
    );
  }
  