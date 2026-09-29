'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="container-site flex h-18 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          Rohan<span className="text-blue-500">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  ? 'page'
                  : undefined
              }
              className={`text-sm transition hover:text-white ${pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'text-white' : 'text-white/65'}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/10 p-2 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <nav id="mobile-navigation" className="container-site flex flex-col py-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 text-white/80"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
