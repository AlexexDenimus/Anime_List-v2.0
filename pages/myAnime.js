import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { Buttons } from "../components/Buttons";
import { useSession } from "next-auth/client";

import styles from "../styles/Main.module.css";

export default function MyAnime({ animeList, count }) {
  const [session, loaded] = useSession();
  const router = useRouter();
  const buttons = [];
  for (let i = 0; i < count; i++) {
    buttons.push(
      <button
        key={i}
        className={styles.pageButton}
        onClick={() => router.push(`/?page=${i + 1}`)}
      >
        {i + 1}
      </button>
    );
  }

  useEffect(() => {
    if (!session && loaded) {
      router.push("/api/auth/signin");
    }
  }, [session, loaded]);
  return (
    <div>
      <Head>
        <title>My Anime List</title>
      </Head>
      <Header hasUser={!!session} />
      <div className={styles.main}>
        <h2>Список аниме</h2>
        <div className={styles.grid}>
          {animeList.map(({ data }) => (
            <Link key={data.id} href={`/${data.id}`}>
              <div>
                <Image
                  src={data.attributes.posterImage.original}
                  alt={data.attributes.slug}
                  width={300}
                  height={400}
                />
                <h3>{data.attributes.canonicalTitle}</h3>
                <p style={{ margin: "8px 0" }}>
                  {data.attributes?.description?.substr(0, 40) || ""}...
                </p>
                <span>{data.attributes.averageRating}</span>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {count > 2 && (
            <Buttons page={Number(router.query.page || 1)} buttons={buttons} />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const limit = 12;
  const offset = (context.query.page - 1) * 12 ?? 0;
  const res = await fetch(
    `http://localhost:8000/myAnime?_page=${offset}&_limit=${limit}`
  );

  const data = await res.json();

  if (!data) {
    return {
      animeList: [],
      count: 1,
    };
  }

  return {
    props: {
      animeList: data,
      count: Math.round(data.count / 12),
    }, // will be passed to the page component as props
  };
}
