import { ProjectForm } from './ProjectForm';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react';
import { profile } from '@/data/profile';
export function Contact() {
  return (
    <div className="contact-layout">
      <div>
        <p className="eyebrow">Start a conversation</p>
        <h1>
          Let’s talk about
          <br />
          <span className="muted">what you’re building.</span>
        </h1>
        <p className="lede">
          Share what you need, your goals and any useful context. Your enquiry is sent by email and
          isn’t saved to a database on this website. You can also reach me through these profiles.
        </p>
        <div className="contact-social-links">
          <a href={`mailto:${profile.email}`}>
            <Mail size={17} /> {profile.email}
          </a>
          <a href={`tel:${profile.phoneHref}`}>
            <Phone size={17} /> {profile.phone}
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <Link href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={17} /> LinkedIn
          </Link>
          <Link href={profile.github} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub
          </Link>
        </div>
      </div>
      <ProjectForm />
    </div>
  );
}
