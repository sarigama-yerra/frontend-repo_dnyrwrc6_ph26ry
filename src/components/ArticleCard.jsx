import { CalendarDays, ArrowRight } from "lucide-react";

export default function ArticleCard({ article, onOpen }) {
  return (
    <article
      className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
          <span className="uppercase tracking-wide">{article.category}</span>
          <span className="text-neutral-400">•</span>
          <span className="inline-flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
            <CalendarDays className="h-3.5 w-3.5" /> {article.date}
          </span>
        </div>
        <h3 className="mt-2 text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white leading-snug">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
          {article.excerpt}
        </p>
        <button
          onClick={() => onOpen(article)}
          className="mt-3 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-3 transition-all"
        >
          Read article <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
