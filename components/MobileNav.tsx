import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  navLinks: { id: string; label: string }[];
  activeLink: string;
  setActiveLink: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function MobileNav({
  navLinks,
  activeLink,
  setActiveLink,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: MobileNavProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-white hover:text-lime-500 transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-black border-t border-green-500/20">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-bold uppercase transition-all ${
                  activeLink === link.id
                    ? 'bg-lime-500/10 text-lime-500 border-l-4 border-lime-500'
                    : 'text-white hover:text-lime-500 hover:bg-lime-500/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
