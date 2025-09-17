import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Cyber Security Society of MATES
            {/*<span className="block text-primary-light">Response Center</span>*/}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Our mission is to promote cyber awareness and ethical online behavior,
              provide cybersecurity training, establish a response system for cybercrime victims,
              develop technical expertise through student-led teams, and build a culture of truthfulness,
              empathy, and responsibility in cyberspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4"
              asChild
            >
              <Link to="/portal">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Cyber Attack
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4"
              asChild
            >
              <Link to="/helpline">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Helpline
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <div className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">24/7 Response</h3>
                <p className="text-sm text-white/80">Round-the-clock security monitoring and incident response</p>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <div className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">Rapid Response</h3>
                <p className="text-sm text-white/80">Immediate action protocols for critical security incidents</p>
              </div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <div className="p-6 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-white/80">Access to certified cybersecurity professionals</p>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;