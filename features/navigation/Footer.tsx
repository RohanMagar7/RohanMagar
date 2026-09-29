import Link from 'next/link';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { profile } from '@/data/profile';
const nav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
export function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#050910]">
      <div className="container-site footer-main">
        <div className="footer-brand">
          <Link href="/" className="text-xl font-bold">
            Rohan<span className="text-blue-400">.</span>
          </Link>
          <p>Websites, applications and software shaped around real needs.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-nav">
          {nav.map((x) => (
            <Link key={x.href} href={x.href}>
              {x.label}
            </Link>
          ))}
        </nav>
        <div className="footer-social">
          <a href={`mailto:${profile.email}`} aria-label="Email Rohan">
            Email
          </a>
          <a href={`tel:${profile.phoneHref}`} aria-label="Call Rohan">
            Call
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp Rohan">
            <MessageCircle size={19} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={19} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={19} />
          </a>
        </div>
      </div>
      <div className="container-site footer-copy">© {new Date().getFullYear()} Rohan Magar</div>
    </footer>
  );
}
