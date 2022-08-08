import { BsFillPlayFill } from "react-icons/bs";
import styles from "./MoviesView.module.css";

export default function MoviesView() {
  return (
    <div>
      <h2 className={styles.pageTitle}>Top picks</h2>
      <MovieList />
    </div>
  );
}

function MovieList() {
  return (
    <div className={styles.moviesWrapper}>
      {[...Array(10).keys()].map((_, i) => (
        <MovieCard key={i} />
      ))}
    </div>
  );
}

function MovieCard() {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60")`,
      }}
    >
      <div className={styles.title}>Movie title</div>
      <div className={styles.duration}>1hr : 45mins</div>
      <button className={styles.button}>
        <BsFillPlayFill className={styles.playIcon} />
        Play now
      </button>
    </div>
  );
}
