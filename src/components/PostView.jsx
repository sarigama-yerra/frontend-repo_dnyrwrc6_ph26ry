import { CalendarDays, Share2 } from "lucide-react";

function ShareButtons({ url, title }) {
  const share = (network) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const links = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };
    window.open(links[network], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => share("twitter")} className="px-3 py-1.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">Twitter</button>
      <button onClick={() => share("linkedin")} className="px-3 py-1.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">LinkedIn</button>
      <button onClick={() => share("facebook")} className="px-3 py-1.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">Facebook</button>
    </div>
  );
}

export default function PostView({ post, onBack, related, onOpen }) {
  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200">← Back to articles</button>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">{post.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
        <span className="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide text-xs">{post.category}</span>
        <span className="text-neutral-400">•</span>
        <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {post.date}</span>
        <span className="text-neutral-400">•</span>
        <span className="inline-flex items-center gap-2"><Share2 className="h-4 w-4" /> <ShareButtons url={window.location.href} title={post.title} /></span>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none mt-6">
        {post.content?.split("\n\n").map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      <Comments />

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Related articles</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((a) => (
            <button key={a.id} onClick={() => onOpen(a)} className="text-left p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase">{a.category}</div>
              <div className="mt-1 font-medium text-neutral-900 dark:text-white line-clamp-2">{a.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Comments() {
  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Comments</h3>
      <form
        onSubmit={(e) => { e.preventDefault(); alert("Thanks for your comment!"); e.currentTarget.reset(); }}
        className="mt-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Name" className="px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-indigo-400" />
          <input type="email" name="email" required placeholder="Email" className="px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <textarea name="comment" required placeholder="Write your comment..." className="mt-3 w-full min-h-[120px] px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-indigo-400" />
        <button className="mt-3 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Submit</button>
      </form>
    </section>
  );
}
