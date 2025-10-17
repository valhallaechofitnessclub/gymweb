interface DesktopNavProps {
  navLinks: { id: string; label: string }[];
  activeLink: string;
  setActiveLink: (id: string) => void;
}

export default function DesktopNav({ navLinks, activeLink, setActiveLink }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => setActiveLink(link.id)}
          className={`relative text-sm font-bold tracking-wide transition-all duration-300 uppercase ${
            activeLink === link.id
              ? 'text-lime-500'
              : 'text-white hover:text-lime-500'
          }`}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
