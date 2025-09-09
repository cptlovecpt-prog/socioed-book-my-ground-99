const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Book My Ground</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Playing sports made easy for enthusiasts
            </p>
          </div>
          
          {/* Features Section */}
          <div>
            <h4 className="text-base font-medium text-foreground mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Facility Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Real-time Availability
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Bookings
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company Links Section */}
          <div>
            <h4 className="text-base font-medium text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Book My Ground. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;