import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import * as gtag from "./utils/gtags.client";

import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Load the GA tracking id from the .env
export const loader = async () => {
  return json({ gaTrackingId: process.env.GA_TRACKING_ID });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const loaded = useLoaderData<typeof loader>();
  console.log("TrackingID:", loaded?.gaTrackingId);

  useEffect(() => {
    if (loaded?.gaTrackingId?.length) {
      gtag.pageview(location.pathname, loaded?.gaTrackingId);
    }
  }, [location, loaded?.gaTrackingId]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {process.env.NODE_ENV === "development" || !loaded?.gaTrackingId ? (
          <meta
            dangerouslySetInnerHTML={{
              __html: `<!-- No tracking (${process.env.NODE_ENV}, ${loaded?.gaTrackingId}) -->`,
            }}
          />
        ) : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${loaded?.gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${loaded?.gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
