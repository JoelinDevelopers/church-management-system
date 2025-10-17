import Link from "next/link"
import {
  Church,
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Users,
  Database,
  BookOpen,
  Shield,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SiteFooter() {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12 md:px-6">
        {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Church className="h-8 w-8" />
              <span className="text-xl font-semibold">ParishPro</span>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Empowering parishes worldwide through comprehensive management systems to organize records, track
              sacraments, and strengthen community connections.
            </p>
            <div className="flex items-center space-x-2 text-blue-200">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium italic">"Serving God's People"</span>
            </div>
            <div className="flex space-x-3">
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors duration-200">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@parishpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  123 Church Street,
                  <br />
                  Vatican City,
                  <br />
                  VC 00120
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:text-blue-200 transition-colors duration-200" href="#">
                  Home
                </Link>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-2"
                  href="#"
                >
                  <Users className="h-3 w-3" />
                  <span>Features</span>
                </Link>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-2"
                  href="#"
                >
                  <Database className="h-3 w-3" />
                  <span>Pricing</span>
                </Link>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-2"
                  href="#"
                >
                  <BookOpen className="h-3 w-3" />
                  <span>Resources</span>
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold invisible">Links</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link className="hover:text-blue-200 transition-colors duration-200" href="#">
                  About Us
                </Link>
                <Link className="hover:text-blue-200 transition-colors duration-200" href="#">
                  Blog
                </Link>
                <Link className="hover:text-blue-200 transition-colors duration-200" href="#">
                  Contact
                </Link>
                <Link
                  className="hover:text-blue-200 transition-colors duration-200 flex items-center space-x-2"
                  href="#"
                >
                  <Shield className="h-3 w-3" />
                  <span>Privacy</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-sm text-blue-100">
              Get the latest updates on features, best practices, and parish management tips.
            </p>
            <form className="space-y-3">
              <Input
                className="bg-white/10 border-white/20 placeholder:text-blue-200 focus:border-white/40 text-white"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="w-full bg-white text-blue-900 hover:bg-blue-50 font-medium transition-colors duration-200"
                type="submit"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div> */}

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">Parish Support</h4>
              <p className="text-sm text-blue-100">
                Dedicated support team available 24/7 to help your parish succeed.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">Secure & Reliable</h4>
              <p className="text-sm text-blue-100">
                Bank-level encryption with 99.9% uptime guarantee for your peace of mind.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">Login</h4>
              <p className="text-sm text-blue-100">
                Admin Login Area <Link href={"/auth/login"} className="font-bold text-yellow-300">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-blue-950/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-center text-sm md:h-16 md:flex-row md:py-0">
          <div className="text-blue-200">Copyright © {new Date().getFullYear()} ParishPro. All Rights Reserved.</div>
          <div className="flex items-center space-x-4 text-blue-200">
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
