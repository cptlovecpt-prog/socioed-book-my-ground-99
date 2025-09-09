import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Target, Eye, Heart, Users } from "lucide-react";

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);

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
                  <button 
                    onClick={() => setIsAboutUsOpen(true)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    About Us
                  </button>
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

      {/* About Us Modal */}
      <Dialog open={isAboutUsOpen} onOpenChange={setIsAboutUsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-2">About Book My Ground</DialogTitle>
            <p className="text-muted-foreground text-base leading-relaxed">
              We're transforming sports facility booking through innovative technology that enhances playing experiences for both facility managers and sports enthusiasts.
            </p>
          </DialogHeader>
          
          <ScrollArea className="h-full pr-6">
            <div className="grid md:grid-cols-2 gap-6 py-6">
              {/* Our Mission */}
              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to sports facilities and make playing more convenient, accessible, and enjoyable for everyone in the community.
                </p>
              </div>

              {/* Our Vision */}
              <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every sports enthusiast has seamless access to quality facilities that promote active lifestyles and community engagement.
                </p>
              </div>

              {/* Our Values */}
              <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Values</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Innovation, accessibility, user-centric design, and a commitment to promoting healthy lifestyles and community sports worldwide.
                </p>
              </div>

              {/* Our Team */}
              <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Team</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A diverse group of athletes, technologists, and designers passionate about creating innovative solutions for the sports community.
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

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