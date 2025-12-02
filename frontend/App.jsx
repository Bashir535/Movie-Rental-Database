// src/App.jsx
import './App.css';

function App() {
  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">🎬 MovieRental</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">My Rentals</a>
          <a href="#">Account</a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <section className="hero">
          <h1>Rent your favorite movies in seconds.</h1>
          <p>
            Browse a huge catalog of classics, new releases, and hidden gems.
            Manage your rentals, track returns, and enjoy movie night.
          </p>
          <div className="hero-actions">
            <button className="btn primary">Browse Movies</button>
            <button className="btn secondary">My Rentals</button>
          </div>
        </section>

        {/* Replace this with your actual movie list component */}
        <section className="movie-section">
          <h2>Featured Movies</h2>
          <div className="movie-grid">
            <div className="movie-card">
              <img src="https://via.placeholder.com/200x300" alt="Movie" />
              <h3>Inception</h3>
              <p>Sci-Fi • 2h 28m</p>
              <button className="btn small">Rent</button>
            </div>
            <div className="movie-card">
              <img src="https://via.placeholder.com/200x300" alt="Movie" />
              <h3>Interstellar</h3>
              <p>Drama • 2h 49m</p>
              <button className="btn small">Rent</button>
            </div>
            <div className="movie-card">
              <img src="https://via.placeholder.com/200x300" alt="Movie" />
              <h3>The Dark Knight</h3>
              <p>Action • 2h 32m</p>
              <button className="btn small">Rent</button>
            </div>
          </div>
        </section>

        {/* You can also render your Login/Register components here */}
        {/* <AuthSection /> */}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} MovieRental Database • CS 157A Project</p>
      </footer>
    </div>
  );
}

export default App;
