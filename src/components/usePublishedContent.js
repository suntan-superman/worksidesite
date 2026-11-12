import { useEffect, useState } from "react";
import { projects as defaultProjects } from "./portfolioData";

export function usePublishedContent() {
  const [content, setContent] = useState({ projects: [], testimonials: [], loaded: false });
  useEffect(() => {
    let active = true;
    fetch("/.netlify/functions/public-content", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("content_unavailable")))
      .then((data) => {
        if (!active) return;
        const overrides = Array.isArray(data.projects) ? data.projects : [];
        const merged = defaultProjects.map((base) => {
          const row = overrides.find((item) => item.slug === base.slug);
          return row ? (row.status === "published" ? { ...base, ...row } : null) : base;
        }).filter(Boolean);
        const additions = overrides.filter((row) => row.status === "published" && !defaultProjects.some((base) => base.slug === row.slug));
        setContent({ projects: [...merged, ...additions], testimonials: Array.isArray(data.testimonials) ? data.testimonials.filter((row) => row.status === "published") : [], loaded: true });
      })
      .catch(() => { if (active) setContent({ projects: defaultProjects, testimonials: [], loaded: true }); });
    return () => { active = false; };
  }, []);
  return content;
}
