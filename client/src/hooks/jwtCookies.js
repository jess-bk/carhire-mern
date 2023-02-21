import { useEffect, useState } from "react";

const useJwtFromCookies = () => {
  const [tokens, setToken] = useState(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const jwtCookieToken = cookies.find((cookie) =>
      cookie.startsWith("tokens=")
    );
    if (jwtCookieToken) {
      setToken(jwtCookieToken.split("=")[1]);
      console.log("tokens", tokens);
      console.log("jwtCookiesToken", jwtCookieToken);
    }
  }, []);

  return tokens;
};

export default useJwtFromCookies;
