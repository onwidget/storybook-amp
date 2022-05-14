import React from "react"
import ReactDOMServer from "react-dom/server";

import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

export default (storyFn, context) => {
  const key = "custom";
  const cache = createCache({ key });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>{storyFn(context)}</CacheProvider>
  );

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);

  console.log("Chunks !!!!");
  console.log(chunks);

  console.log("Styles !!!!");
  console.log(styles);

  return {
    html,
    styles,
  };
};