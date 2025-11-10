import { Search, Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({ onSearch, query, onToggleTheme, dark, onNavigateHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const NavLinks = () => (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
      <button onClick={onNavigateHome} className="hover:text-black dark:hover:text-white">Home</button>
      <a href="#categories" className="hover:text-black dark:hover:text-white">Categories</a>
      <a href="#about" className="hover:text-black dark:hover:text-white">About</a>
      <a href="#contact" className="hover:text-black dark:hover:text-white">Contact</a>
    </nav>
  );

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 bg-white/90 dark:bg-neutral-900/90 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <button onClick={() => setMobileOpen((s) => !s)} className="md:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Menu className="h-5 w-5" />
        </button>
        <div onClick={onNavigateHome} className="cursor-pointer select-none">
          <div className="flex items-baseline gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">ModernPress</span>
          </div>
          <p className="sr-only">A modern, professional blog for thoughtful readers</p>
        </div>

        <div className="hidden md:flex ml-8"><NavLinks /></div>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-44 sm:w-64 pl-9 pr-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 px-4 pb-3">
          <div className="py-3 flex flex-col gap-3 text-neutral-700 dark:text-neutral-300">
            <button onClick={() => { onNavigateHome(); setMobileOpen(false); }} className="text-left">Home</button>
            <a href="#categories" onClick={() => setMobileOpen(false)}>Categories</a>
            <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
