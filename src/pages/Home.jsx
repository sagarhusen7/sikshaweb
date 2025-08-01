import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  Users,
  Video,
  Star,
  Award,
  Globe,
  ArrowRight,
  Play,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Master Programming with Interactive Coding",
      subtitle: "Build real projects with our integrated code editor",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1920&h=1080&fit=crop",
      gradient: "from-purple-600 via-indigo-600 to-blue-600",
    },
    {
      title: "Learn from Industry Experts",
      subtitle: "Get certified by professionals who've been there",
      image:
        "  https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
    },
    {
      title: "Join a Global Learning Community",
      subtitle: "Connect with learners from around the world",
      image:
        "  https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1920&h=1080&fit=crop",
      gradient: "from-teal-600 via-green-600 to-emerald-600",
    },
  ];
  const showLoginToast = () => {
    toast.error("Please create an account or login to view courses.");
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen relative overflow-hidden">
      {/* Premium CSS Animations */}
      <style jsx>{`
        @keyframes bubble {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .bubble {
          animation: bubble 15s linear infinite;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark .glass-effect {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glow {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .tilt-card {
          perspective: 1000px;
        }

        .tilt-card-inner {
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tilt-card:hover .tilt-card-inner {
          transform: rotateY(10deg) rotateX(5deg);
        }

        .tilt-card img,
        .tilt-card .glass-effect {
          transform: translateZ(20px);
        }

        .float-element {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full bubble opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Top-right Auth Buttons */}
      <div className="flex justify-end p-6 absolute top-0 right-0 gap-4 z-50">
        <button
          onClick={() => navigate("/login")}
          className="text-sm font-semibold px-6 py-2 glass-effect rounded-full hover:bg-white/20 transition-all duration-300 text-white hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="text-sm font-semibold px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Sign Up
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`}
              />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-center max-w-6xl mx-auto px-6">
  {/* Tagline: AI as the quiet engine */}
  <span className="block text-blue-200 text-xl md:text-2xl font-medium tracking-wide mb-4 animate-in-fade-up">
    Powered by AI. Designed for Rise.
  </span>

  {/* Main Headline */}
  <span className="block bg-gradient-to-r from-white via-yellow-50 to-orange-100 bg-clip-text text-transparent animate-in-slide-up">
    From Learning in Silence
  </span>
  <span className="block bg-gradient-to-r from-yellow-200 to-red-200 bg-clip-text text-transparent animate-in-slide-up"
        style={{ animationDelay: '0.5s' }}>
    to Earning with Confidence
  </span>

  {/* Brand Line */}
  <span className="block mt-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 font-extrabold animate-gradient-breath tracking-tight">
    Only at SikshaWeb
  </span>

  {/* Subheading */}
  <span className="block mt-6 text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed animate-in-fade-up delay-700">
    Smart learning paths. Real job outcomes. Backed by AI that knows your potential.
  </span>
</h1>

<style jsx>{`
  @keyframes in-fade-up {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes gradient-breath {
    0%, 100% {
      background-position: 0% 50%;
      text-shadow: 0 0 20px rgba(255, 160, 0, 0.3);
    }
    50% {
      background-position: 100% 50%;
      text-shadow: 0 0 30px rgba(255, 180, 0, 0.4);
    }
  }
  .animate-in-fade-up {
    animation: in-fade-up 0.7s ease-out forwards;
    opacity: 0;
  }
  .animate-in-slide-up {
    animation: in-fade-up 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(40px);
  }
  .animate-gradient-breath {
    background-size: 200% 200%;
    animation: gradient-breath 5s ease-in-out infinite alternate;
    display: inline-block;
  }
  .delay-700 {
    animation-delay: 0.7s;
  }
`}</style>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2 text-lg"
            >
              <Play className="w-5 h-5" />
              Get Started for Free
            </button>
            <button
              onClick={showLoginToast}
              className="glass-effect px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white flex items-center gap-2 text-lg"
            >
              Browse Courses
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Why Choose SikshaWeb?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: BookOpen,
              title: "Interactive Learning",
              desc: "Hands-on coding exercises and real-world projects",
            },
            {
              icon: Award,
              title: "Industry Certificates",
              desc: "Recognized certifications from top tech companies",
            },
            {
              icon: Globe,
              title: "Global Community",
              desc: "Connect with learners and experts worldwide",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group tilt-card p-8 rounded-3xl glass-effect hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="tilt-card-inner">
                <feature.icon className="w-12 h-12 text-indigo-500 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Featured Courses */}
<section className="py-20 px-6 max-w-6xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
    <Star className="w-8 h-8 text-yellow-500" />
    Featured Courses
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        id: 1,
        title: "Advanced JavaScript Mastery",
        description: "Master modern JavaScript with ES6+, async programming, and advanced concepts.",
        image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: 2,
        title: "UI/UX Design Fundamentals",
        description: "Learn the principles of great design and create stunning user interfaces.",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=60",
      },
      {
        id: 3,
        title: "Python for Data Science",
        description: "Analyze data, build models, and visualize results using Python and its libraries.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=60",
      },
    ].map((course, index) => (
      <div
        key={course.id}
        className="group tilt-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="tilt-card-inner">
          <div className="relative overflow-hidden">
            <img
              src={course.image}
              alt={`Course ${course.id}`}
              className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              Premium
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {course.description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <span className="text-sm text-gray-500">2,847 students</span>
            </div>
            <button
              onClick={showLoginToast}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              View Course
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-20 border border-white/20 rounded-full float-element"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
          {[
            { icon: Users, count: "10,000+", label: "Happy Students" },
            { icon: BookOpen, count: "150+", label: "Expert Courses" },
            { icon: Video, count: "5000+", label: "Video Lessons" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <stat.icon className="w-12 h-12 mx-auto text-white mb-4 group-hover:scale-125 transition-transform duration-300" />
              <h3 className="text-4xl font-bold text-white mb-2">{stat.count}</h3>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Testimonials */}
<section className="py-20 px-6 max-w-5xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
    💬 What Students Say
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[
      {
        name: "Alice Johnson",
        role: "Full Stack Developer",
        rating: 5,
        message: "SikshaWeb has completely transformed how I approach learning. The interactive coding environment and expert-led courses helped me land my dream job!",
        image: "https://plus.unsplash.com/premium_photo-1682096181675-12f8293cd31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Ravi Patel",
        role: "Data Scientist",
        rating: 5,
        message: "Thanks to SikshaWeb, I gained hands-on experience with Python and ML projects that made me stand out during interviews.",
        image: "https://images.unsplash.com/photo-1677594332295-affd04f83115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:scale-105 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full -mr-10 -mt-10 opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
          "{testimonial.message}"
        </p>
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
          />
          <div>
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


{/* Blog Section */}
<section className="py-20 bg-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
        From Our Learning Blog
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Insights, tips, and stories from education thought leaders
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "The Future of Online Education",
          image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?fit=crop&w=600&h=400",
          excerpt: "How technology is shaping the classroom of tomorrow.",
          author: "Dr. Anita Mehta",
          url: "https://www.developer-tech.com/"
        },
        {
          title: "10 Study Habits of Top Students",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?fit=crop&w=600&h=400",
          excerpt: "Practical strategies to boost your productivity and focus.",
          author: "James Taylor",
          url: "https://dev.to/dvddpl/good-habits-good-code-quality-8ef"
        },
        {
          title: "Building Career-Ready Skills",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=600&h=400",
          excerpt: "Top skills employers are looking for in 2025 and beyond.",
          author: "Prof. Kiran Desai",
          url: "https://www.developer-tech.com/"
        },
      ].map((blog, i) => (
        <a
          key={i}
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl shadow-lg overflow-hidden bg-gray-50 dark:bg-gray-800 transition-transform hover:scale-105 block"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {blog.excerpt}
            </p>
            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              By {blog.author}
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 float-element"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of learners who have already transformed their careers with SikshaWeb
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-2xl text-lg"
          >
            Start Learning Today
          </button>
        </div>
      </section>

{/* Footer */}
<footer className="bg-gray-900 text-white py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          SikshaWeb
        </h3>
        <p className="text-gray-400 mb-4">
          Empowering learners worldwide with cutting-edge technology and expert-crafted courses.
        </p>
        <div className="flex gap-4">
          {[
            { Icon: Facebook, url: "https://facebook.com/sikshaweb" },
            { Icon: Twitter, url: "https://twitter.com/sikshawebs" },
            { Icon: Instagram, url: "https://instagram.com/sikshaweb" },
            { Icon: Linkedin, url: "https://www.linkedin.com/in/sagar-husen-72447a256" },

            { Icon: Youtube, url: "https://youtube.com/sikshaweb" },
          ].map(({ Icon, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          {["About Us", "Courses", "Pricing", "Blog", "Careers"].map((link, index) => (
            <li key={index}>
              <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Support</h4>
        <ul className="space-y-2">
          {["Help Center", "Contact Us", "FAQ", "Community", "Terms"].map((link, index) => (
            <li key={index}>
              <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-400">sagarghp@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-400">8084615106</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-400">New Delhi, India</span>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
        © 2025 SikshaWeb. All rights reserved.
      </p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <button className="text-gray-400 hover:text-white text-sm transition-colors">
          Privacy Policy
        </button>
        <button className="text-gray-400 hover:text-white text-sm transition-colors">
          Terms of Service
        </button>
        <button className="text-gray-400 hover:text-white text-sm transition-colors">
          Cookie Policy
        </button>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}