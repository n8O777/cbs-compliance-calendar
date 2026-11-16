"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow, ContactLink } from "./ui";

export interface NavItem {
  id: string;
  label: string;
}

// Sticky site header. Highlights the section in view and keeps the
// --header-h CSS variable equal to the header's height, so section anchors
// (scroll-margin-top) land just below it at every width.
export function SiteHeader({ nav, ctaLabel }: { nav: NavItem[]; ctaLabel: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;
    const measure = () => root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [nav]);

  return (
    <header className="site-header" ref={ref}>
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" aria-label="CBS Medical Billing and Consulting, back to top">
          <Image src="/cbs-logo-white.svg" alt="" width={104} height={52} priority unoptimized />
        </a>
        <nav aria-label="Page sections" className="site-nav">
          {nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <ContactLink className="site-header__cta">
          {ctaLabel} <Arrow />
        </ContactLink>
      </div>
    </header>
  );
}
