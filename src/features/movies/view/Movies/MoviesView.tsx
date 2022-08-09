import { useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { notify } from "../../../../lib/utils/helper";
import { useGetAllMoviesQuery } from "../../logic/slice";
import { MovieEntity } from "../../models/MovieEntity";
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
  const { data, error, isLoading } = useGetAllMoviesQuery();

  useEffect(() => {
    if (error) {
      notify({
        message: error.data.message,
        type: "error",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div
        onLoad={() => {
          notify({
            message: "Loading movies...",
            type: "info",
          });
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className={styles.moviesWrapper}>
      {[...(data as MovieEntity[])].map((item, i) => (
        <MovieCard item={item} key={i} />
      ))}
    </div>
  );
}

function MovieCard({ item }: { item: MovieEntity }) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${
          item.image ||
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        })`,
      }}
    >
      <div className={styles.title}>{item.name}</div>
      <div className={styles.duration}>{item.duration}</div>
      <button className={styles.button}>
        <BsFillPlayFill className={styles.playIcon} />
        Play now
      </button>
    </div>
  );
}
