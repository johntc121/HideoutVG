"use client"; // ✅ Client Component for Disqus

import { useEffect } from "react";

export default function ArticleClient({ slug }) {
  useEffect(() => {
    const loadComments = () => {
      var disqus_config = function () {
        this.page.url = window.location.href; // ✅ Set Disqus URL dynamically
        this.page.identifier = slug; // ✅ Unique identifier for each article
      };
      const script = document.createElement("script");
      script.src = "https://hideoutvg.disqus.com/embed.js";
      script.setAttribute("data-timestamp", +new Date());

      document.body.appendChild(script);
    };

    loadComments();
  }, []);

  return <div id="disqus_thread" className="mt-8"></div>;
}
