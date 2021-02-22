import { useState } from "react";
import style from "../../styles/Page.module.css";
import Image from "next/image";
import { Header } from "../../components/Header";
import { useSession } from "next-auth/client";

const Page = ({ animeInfo, userAnime }) => {
  const [session] = useSession();
  const [liked, setLiked] = useState(!!userAnime);

  const handleClick = async () => {
    if (!liked) {
      setLiked(true);
      await fetch("http://localhost:8000/myAnime", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: animeInfo.id,
          user: session.user.email,
          data: animeInfo,
        }),
      });
    } else {
      setLiked(false);
      userAnime &&
        (await fetch(`http://localhost:8000/myAnime/${userAnime.id}`, {
          method: "DELETE",
        }));
    }
  };

  return (
    <>
      <Header hasUser={!!session} />
      <div>
        <div className={style.imageContainer}>
          <Image
            src={
              animeInfo.attributes.coverImage
                ? animeInfo.attributes.coverImage.large
                : animeInfo.attributes.posterImage.large
            }
            alt={animeInfo.attributes.slug}
            layout="fill"
          />
        </div>
        <div className={style.content}>
          <div>
            <div className={style.title}>
              <h1>{animeInfo.attributes.canonicalTitle}</h1>
              {session && (
                <div
                  id="heart"
                  className={style.heart}
                  onClick={handleClick}
                ></div>
              )}
            </div>
            <div className={style.description}>
              {animeInfo.attributes.episodeCount && (
                <div className={style.details}>
                  <h3>Количество эпизодов:</h3>
                  <div style={{ marginLeft: "8px" }}>
                    {animeInfo.attributes.episodeCount}
                  </div>
                </div>
              )}
              {animeInfo.attributes.startDate && (
                <div className={style.details}>
                  <h3>Дата выхода:</h3>
                  <div style={{ marginLeft: "8px" }}>
                    {animeInfo.attributes.startDate}
                  </div>
                </div>
              )}
              <h3 style={{ marginBottom: "8px" }}>Описание:</h3>
              <div>{animeInfo.attributes.synopsis}</div>
            </div>
          </div>
          <div className={style.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${animeInfo.attributes.youtubeVideoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          #heart {
            ${liked
              ? "background-position: -2800px 0"
              : "background-position: 0 0"}
          }
        `}
      </style>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://kitsu.io/api/edge/anime/${context.query.id}`
  );

  const userRes = await fetch(
    `http://localhost:8000/myAnime/${context.query.id}`
  );

  const { data } = await res.json();

  const userAnime = await userRes.json();

  return {
    props: {
      animeInfo: data ? data : {},
      userAnime: userAnime && userAnime.data ? userAnime.data : null,
    }, // will be passed to the page component as props
  };
}
