import { AiFillStar } from "react-icons/ai";
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

  if (isLoading) {
    return (
      <div
        className={styles.pageTitle}
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
    return <div className={styles.moviesWrapper}>Error!</div>;
  }

  return (
    <div className={styles.moviesWrapper}>
      {(data as MovieEntity[]).map((item, i) => (
        <MovieCard item={item} key={i} />
      ))}
    </div>
  );
}

function MovieCard({ item }: { item: MovieEntity }) {
  const hoverVisible = (className: string) =>
    `${styles.onCardHover} ${className}`;

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
      <div className={styles.cardHead}>
        <div className={styles.ratingWrap}>
          <AiFillStar className={styles.ratingStar} /> {item.rating}
        </div>
        <div className={hoverVisible(styles.movieName)}>{item.name}</div>
        <div className={hoverVisible(styles.duration)}>
          Duration: {item.duration}
        </div>
        <div className={hoverVisible(styles.tagsWrap)}>
          {item.genres.map((item, i) => (
            <div className={styles.tag} key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.gridItem}></div>
      <div className={styles.gridItem}></div>
      <div className={hoverVisible(styles.cardFooter)}></div>
      <button className={hoverVisible(styles.button)}>
        <BsFillPlayFill className={styles.playIcon} />
        Play now
      </button>
    </div>
  );
}
