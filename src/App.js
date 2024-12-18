import React, { useState, useEffect } from 'react';
import './App.css'; // Styles for light/dark mode and grid/list view

const App = () => {
  // State management for books, view, search term, and light/dark mode
  const [books, setBooks] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data for books (this will be used if fetching fails or for local mock data)
  // const mockBooks = [
  //   {
  //     id: 1,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     image: "https://example.com/to-kill-a-mockingbird.jpg",
  //     description: "A novel about the serious issues of rape and racial inequality."
  //   },
  //   {
  //     id: 2,
  //     title: "1984",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     image: "https://example.com/1984.jpg",
  //     description: "A dystopian social science fiction novel and cautionary tale."
  //   },
  //   {
  //     id: 3,
  //     title: "Moby Dick",
  //     author: "Herman Melville",
  //     genre: "Adventure",
  //     image: "https://example.com/moby-dick.jpg",
  //     description: "A sailor’s narrative of the obsessive quest of Ahab for revenge on the whale Moby Dick."
  //   }
  // ];

  // Fetch books from the JSON file or use mock data
  useEffect(() => {
    // Try to fetch books from a local JSON file
    fetch('/books.json')  // Adjust the file path to match your real JSON location
      .then((response) => response.json())
      .then((data) => setBooks(data))  // If successful, use real data
      .catch((error) => {
        console.error('Error fetching books:', error);
        // Use mock data if fetch fails
        // setBooks(mockBooks);
      });
  }, []);

  // Function to filter books based on search term
  const filterBooks = (books, term) => {
    return books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.genre.toLowerCase().includes(term.toLowerCase())
    );
  };

  // Handle search filter
  const filteredBooks = filterBooks(books, searchTerm);

  // Toggle between grid and list view
  const toggleView = () => {
    setViewMode(prevViewMode => (prevViewMode === 'grid' ? 'list' : 'grid'));
  };

  // Toggle light/dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <header>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleView}>
          Switch to {viewMode === 'grid' ? 'List' : 'Grid'} View
        </button>
      </header>

      <div className={viewMode === 'grid' ? 'grid-view' : 'list-view'}>
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => setSelectedBook(book)}
          >
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedBook(null)}>&times;</span>
            <img src={selectedBook.image} alt={selectedBook.title} />
            <h3>{selectedBook.title}</h3>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
