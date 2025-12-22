function TomatoLogo({ className = '' }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="7" fill="#3b82f6" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" />
      <path d="M12 6.4c-1.4-.9-2.9-1.3-4.3-1.3 1.5-1.2 3.3-1.9 5.2-1.9s3.7.7 5.2 1.9c-1.4 0-2.9.4-4.3 1.3-.6.3-1.2.3-1.8 0z" fill="#60a5fa" opacity="0.95" />
      <path d="M8.8 12.2c1.6-1.1 3.2-1.1 4.6 0" stroke="white" strokeOpacity="0.25" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-gradient-to-b from-transparent to-slate-900/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <TomatoLogo />
            <span className="text-sm text-blue-200/80">© {new Date().getFullYear()} Blue Tomatoes. All rights reserved.</span>
          </div>
          <div className="text-xs text-blue-200/70">
            Built with pragmatic sprints · Fintech-grade security · AI-enabled workflows
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
