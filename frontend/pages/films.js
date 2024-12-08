// pages/films.js

import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Head from "next/head";

import { FaEye, FaHeart, FaStar } from "react-icons/fa";

export default function Films() {
  // Fetch data with custom hook
  const { alldata, loading } = useFetchData("/api/getmovies");

  // Filter for published films
  const publishedData = (alldata || []).filter((ab) => ab.status === "publish");

  // Filter data specifically for films
  const filmsData = publishedData.filter((ab) => ab.titlecategory === "films");

  return (
    <>
      <Head>
        <title>All Movies</title>
        <meta name="description" content="All the Films in Telugu" />
      </Head>

      <section className="genrenamesec">
        <div className="genrename">
          <h1>Anime Movies</h1>
          <p>
            Explore the world of Anime Movies in Telugu. From epic tales to thrilling dramas, 
            experience a wide variety of Animes in your language. Your ultimate 
            destination for Telugu-dubbed Animes!
          </p>
        </div>
      </section>

      <section className="genremoviesec">
        <div className="genremovie">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {filmsData.map((film) => (
                <div className="mcard" key={film.slug}>
                  <Link href={`/movies/${film.slug}`}>
                    <div className="cardimg">
                      <img
                        src={film.smposter}
                        alt={film.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="contents">
                      <h5>{film.title}</h5>
                      <h6>
                        <span>{film.year}</span>
                        <div className="rate">
                          <i className="cardfas">
                            <FaHeart />
                          </i>
                          <i className="cardfas">
                            <FaEye />
                          </i>
                          <i className="cardfas">
                            <FaStar />
                          </i>
                          <h6>{film.rating}</h6>
                        </div>
                      </h6>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
