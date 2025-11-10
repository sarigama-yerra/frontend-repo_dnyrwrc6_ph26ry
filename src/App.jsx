import { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import ArticleCard from "./components/ArticleCard";
import PostView from "./components/PostView";
import Footer from "./components/Footer";

const seedArticles = [
  {
    id: 1,
    title: "Designing for Calm: Principles of Minimalist UI",
    category: "Design",
    date: "Oct 10, 2025",
    excerpt:
      "A deep dive into crafting interfaces that feel effortless—balancing negative space, motion, and hierarchy for focus.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    content:
      "Minimalist UI is not about removing elements—it's about removing friction. Start by clarifying the primary action on each screen. Use scale and spacing to guide attention rather than heavy borders or color blocks.\n\nWhitespace is active; it provides rhythm. Pair it with consistent typographic scales and a restrained color system. Motion should orient, not distract.\n\nFinally, design for comfort: generous line-height, predictable interactions, and accessible contrast make reading a pleasure.",
  },
  {
    id: 2,
    title: "From Notes to Narrative: Structuring Engaging Articles",
    category: "Writing",
    date: "Sep 28, 2025",
    excerpt:
      "Turn scattered ideas into compelling stories with arcs, section anchors, and scannable summaries.",
    image:
      "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop",
    content:
      "Great articles respect reader time. Lead with context, then promise value. Use descriptive subheads and keep paragraphs short.\n\nAdd lightweight visuals to reset attention and provide visual anchors. Close with a clear outcome or action to take next.",
  },
  {
    id: 3,
    title: "The Subtle Art of Color Systems",
    category: "Design",
    date: "Aug 15, 2025",
    excerpt:
      "How to build a cohesive palette that adapts gracefully to light and dark modes.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop",
    content:
      "Color conveys structure and emotion. Start with neutrals for backgrounds and surfaces, then layer a single accent for emphasis.\n\nTest your palette across states: hover, focus, disabled. Ensure AA contrast for body text at minimum.",
  },
  {
    id: 4,
    title: "Tech Reading Habits in 2025",
    category: "Research",
    date: "Jul 02, 2025",
    excerpt:
      "What analytics reveal about session length, scroll depth, and where readers drop off.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop",
    content:
      "Readers skim first, then commit. Provide wayfinding cues: estimated reading time, summaries, and clear section breaks.\n\nRespect cognitive load: avoid aggressive popups, keep typography legible, and offer a calm dark mode.",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("modernpress_theme");
    if (stored) setDark(stored === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("modernpress_theme", dark ? "dark" : "light");
  }, [dark]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seedArticles;
    return seedArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  const related = useMemo(() => {
    if (!active) return [];
    return seedArticles.filter((a) => a.id !== active.id && a.category === active.category).slice(0, 2);
  }, [active]);

  const goHome = () => setActive(null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Header
        onSearch={setQuery}
        query={query}
        onToggleTheme={() => setDark((d) => !d)}
        dark={dark}
        onNavigateHome={goHome}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!active ? (
          <>
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Latest Articles</h2>
                <p className="mt-1 text-neutral-600 dark:text-neutral-300">Curated insights across design, writing, and research.</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                <span>Theme:</span>
                <button onClick={() => setDark(false)} className={`px-3 py-1 rounded-md border ${!dark ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700' : 'border-transparent'} `}>Light</button>
                <button onClick={() => setDark(true)} className={`px-3 py-1 rounded-md border ${dark ? 'bg-neutral-800 text-white border-neutral-700' : 'border-transparent'}`}>Dark</button>
              </div>
            </section>

            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} onOpen={setActive} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-neutral-500">No results. Try a different search.</div>
              )}
            </section>

            <aside id="categories" className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from(new Set(seedArticles.map((a) => a.category))).map((c) => (
                <div key={c} className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{c}</div>
                  <div className="mt-1 text-xs text-neutral-500">{seedArticles.filter(a => a.category===c).length} articles</div>
                </div>
              ))}
            </aside>
          </>
        ) : (
          <PostView post={active} onBack={goHome} related={related} onOpen={setActive} />
        )}
      </main>

      <Footer />
    </div>
  );
}
