"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/libs/storageHelper";
import { Button, buttonVariants } from "../Inputs/Button";

const CookieBanner = () => {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, []);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";
    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });
    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  const cookieBannerClasses = `flex flex-col md:flex-row gap-4 px-3 py-3 md:px-4 items-center bg-zinc-950 border border-zinc-700 rounded-lg shadow ${
    cookieConsent !== null ? "hidden" : "flex"
  }`;

  const handleDecline = () => {
    setCookieConsent(false);
  };

  const handleAllowCookies = () => {
    setCookieConsent(true);
  };

  return (
    <div className="fixed bottom-0 right-0 m-2.5 z-10 flex items-center justify-center w-auto md:w-full backdrop-blur-sm">
      <div className={cookieBannerClasses}>
        <div className="text-center">
          <Link href="/privacy-policy">
            <p>
              We use <span className="font-bold text-zinc-400">cookies</span> on
              our site for Google Analytics
            </p>
          </Link>
        </div>
        <div className="hidden md:block w-[1px] h-[30px] rotate-180 bg-zinc-700"></div>
        <div className="flex gap-2">
          <Button
            className={buttonVariants({ variant: "special" })}
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button
            className={buttonVariants({ variant: "special" })}
            onClick={handleAllowCookies}
          >
            Allow Cookies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
