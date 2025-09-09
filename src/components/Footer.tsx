import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);

  return (
    <>
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
                  <button 
                    onClick={() => setIsPrivacyPolicyOpen(true)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsTermsOfServiceOpen(true)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Terms of Service
                  </button>
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

      {/* Privacy Policy Modal */}
      <Dialog open={isPrivacyPolicyOpen} onOpenChange={setIsPrivacyPolicyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
            <p className="text-sm text-muted-foreground">Last updated: Aug 31, 2025</p>
          </DialogHeader>
          
          <ScrollArea className="h-full pr-6">
            <div className="space-y-6 py-4">
              {/* Information We Collect */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Information We Collect</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">How We Use Your Information</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                </p>
              </section>

              {/* Information Sharing */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Information Sharing</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Data Security</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Contact Us</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@socioed.com.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={isTermsOfServiceOpen} onOpenChange={setIsTermsOfServiceOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
            <p className="text-sm text-muted-foreground">Last updated: Aug 31, 2025</p>
          </DialogHeader>
          
          <ScrollArea className="h-full pr-6">
            <div className="space-y-6 py-4">
              {/* Acceptance of Terms */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Acceptance of Terms</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By accessing and using SocioEd, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              {/* Use License */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Use License</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Permission is granted to temporarily download one copy of SocioEd materials for personal, non-commercial transitory viewing only.
                </p>
              </section>

              {/* Disclaimer */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The materials on SocioEd are provided on an "as is" basis. SocioEd makes no warranties, expressed or implied.
                </p>
              </section>

              {/* Limitations */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Limitations</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  In no event shall SocioEd or its suppliers be liable for any damages arising out of the use or inability to use the materials.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@socioed.com.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;