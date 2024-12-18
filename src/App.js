import React, { useState, useEffect } from 'react';
import './App.css'; // We'll add the styles for light/dark mode and the grid/list view

const App = () => {
  // Initializing the state for books, view, search term, and light/dark mode
  const [books, setBooks] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Fetch books from the JSON file
  useEffect(() => {
    // Using fetch to load the JSON data
    fetch('/books.json') // If the JSON is inside the public folder
  
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);
  // // Sample mock data (in a real app, this could come from an API)
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
  //   }, {
  //     id: 4,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     image: "https://example.com/to-kill-a-mockingbird.jpg",
  //     description: "A novel about the serious issues of rape and racial inequality."
  //   }, {
  //     id: 5,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     image: "https://example.com/to-kill-a-mockingbird.jpg",
  //     description: "A novel about the serious issues of rape and racial inequality."
  //   }, {
  //     id: 6,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     image: "https://example.com/to-kill-a-mockingbird.jpg",
  //     description: "A novel about the serious issues of rape and racial inequality."
  //   }
  // ];

  // // Fetch the books from mock data or local JSON file
  // useEffect(() => {
  //   setBooks(mockBooks);
  // }, []);

  // Handle search filter
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Switch between grid and list view
  const toggleView = () => {
    setViewMode(prevViewMode => (prevViewMode === 'grid' ? 'list' : 'grid'));
  };

  // Handle light/dark mode toggle
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
