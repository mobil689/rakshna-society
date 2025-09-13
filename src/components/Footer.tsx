import { Button } from '@/components/ui/button';
import { Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="text-xl font-bold">CyberSecure</span>
            </div>
            <p className="text-primary-foreground/80">
              Protecting digital assets through comprehensive cybersecurity solutions and rapid incident response.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>Emergency: 1930</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>rakshana.mait@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>MAIT ,Sec 22, PSP Area, Delhi, 110086</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/portal" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Report Incident</Link></li>
              <li><Link to="/helpline" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Emergency Helpline</Link></li>
              <li><Link to="/guidelines" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Security Guidelines</Link></li>
              <li><Link to="/training" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Training Resources</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/incident-response" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Incident Response</Link></li>
              <li><Link to="/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Security Events</Link></li>
              <li><Link to="/handbook" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Security Handbook</Link></li>
              <li><Link to="/webstream" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Live Webinars</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Connect</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/accessibility" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Accessibility</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
            </ul>
            
            <div className="flex space-x-3 pt-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground" asChild>
                <a href="https://twitter.com/Rakshna" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground" asChild>
                <a href="https://linkedin.com/company/rakshana-mait" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
                {/* Instagram button with your new link */}
                <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground" asChild>
                    <a href="https://www.instagram.com/rakshnamait" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5" />
                    </a>
                </Button>
              {/*<Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground" asChild>*/}
              {/*  <a href="https://github.com/cybersecure" target="_blank" rel="noopener noreferrer">*/}
              {/*    <Github className="h-5 w-5" />*/}
              {/*  </a>*/}
              {/*</Button>*/}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Rakshna. All rights reserved. | CyberSecurity Society of Mates.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;