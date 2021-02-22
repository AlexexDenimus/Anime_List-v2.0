import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/client";

import style from "../styles/Header.module.css";

export const Header = ({ hasUser }) => {
  return (
    <div className={style.flex}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={style.link}>
          <Link href="/">
            <Image
              src="https://s2.bunnycdn.ru/assets/gogo/img/icon/logo.png"
              width={140}
              height={50}
            />
          </Link>
        </div>
        {hasUser && (
          <div
            style={{ marginLeft: "32px" }}
            className={`${style.link} ${style.log}`}
          >
            <Link href="/myAnime">my list</Link>
          </div>
        )}
      </div>
      <button
        className={style.log}
        onClick={hasUser ? () => signOut() : () => signIn("google")}
      >
        {hasUser ? "Logout" : "Login"}
      </button>
    </div>
  );
};
