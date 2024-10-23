interface BookDetailProps {
    book: string;
    handleContent: (type: string, id?: string) => void;
  }
  
  export default function BookDetail({ book, handleContent }: BookDetailProps) {
    function handleClick() {
      const bookId = book.split(':')[0].trim();
      handleContent('book_dtls', bookId);
    }
  
    return (
      <button onClick={handleClick}>View Detail</button>
    );
  }
  