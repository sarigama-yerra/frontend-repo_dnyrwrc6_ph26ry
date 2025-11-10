export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            <span className="text-lg font-semibold text-neutral-900 dark:text-white">ModernPress</span>
          </div>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">A modern, minimalist blog template focused on clarity, comfort, and readable typography.</p>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white">Contact</h4>
          <ul className="mt-3 space-y-1 text-neutral-600 dark:text-neutral-300">
            <li>Email: hello@modernpress.example</li>
            <li>Twitter: @modernpress</li>
            <li>LinkedIn: company/modernpress</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-900 dark:text-white">Newsletter</h4>
          <form className="mt-3 flex gap-2" onSubmit={(e)=>{e.preventDefault(); alert('Thanks for subscribing!')}}>
            <input type="email" required placeholder="Your email" className="flex-1 px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-indigo-400" />
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Join</button>
          </form>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 py-4">© {new Date().getFullYear()} ModernPress. All rights reserved.</div>
    </footer>
  );
}
