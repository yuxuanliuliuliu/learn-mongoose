import { useState } from 'react';
import axios from 'axios';
import ViewAuthor from './authors';
import ViewBooks from './books';
import ShowStatus from './available';
import BookDetail from './bookdtls';
import AddBook from './addbook';
import makeUrl from '../utils/makeurl';

interface Content {
  data: string[];
  dtls: boolean;
}

export default function LibClient() {
  const [content, setContent] = useState<Content>({ data: [], dtls: false });

  function handleContent(contentType: string, bookId: string = 'NA') {
    axios.get(makeUrl(contentType, bookId))
      .then(res => {
        let showDtls = false;
        if (contentType === 'books') {
          showDtls = true;
        }
        if (contentType === 'book_dtls') {
          const copies = res.data.copies;
          res.data = copies.map((copy: { imprint: string, status: string }) => {
            return copy.imprint + ' | ' + copy.status;
          });
        }
        setContent({ data: res.data, dtls: showDtls });
      });
  }

  return (
    <div>
      <ol>
        {content.data.map((val, index) => (
          <li key={index}>
            {val}
            {content.dtls && <BookDetail book={val} handleContent={handleContent} />}
          </li>
        ))}
      </ol>
      <ViewAuthor handleContent={handleContent} />
      <ViewBooks handleContent={handleContent} />
      <ShowStatus handleContent={handleContent} />
      <AddBook />
    </div>
  );
}
