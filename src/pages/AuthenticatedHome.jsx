// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Trophy,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

export default function AuthenticatedHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const heroSlides = [
    {
      title: "Master New Skills",
      subtitle: "Learn from industry experts",
      description:
        "Join millions of learners worldwide and advance your career with our premium courses",
      image:
        "https://plus.unsplash.com/premium_photo-1721225464945-97076602de73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8M2QlMjByZW5kZXIlMjBlZHVjdGFpb258ZW58MHx8MHx8fDA%3D",
      color: "from-blue-600 to-purple-600",
    },
    {
      title: "Advance Your Career",
      subtitle: "Get certified and stand out",
      description:
        "Earn certificates from top universities and companies to boost your professional profile",
      image:
        " https://plus.unsplash.com/premium_photo-1681488088523-ef98813db228?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fDNkJTIwcmVuZGVyJTIwZWR1Y3RhaW9ufGVufDB8fDB8fHww",
      color: "from-green-600 to-teal-600",
    },
    {
      title: "Learn at Your Pace",
      subtitle: "Flexible learning experience",
      description:
        "Access courses anytime, anywhere with our mobile-friendly platform",
      image:
        " https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHwzZCUyMHJlbmRlciUyMGVkdWN0YWlvbnxlbnwwfHwwfHx8MA%3D%3D",
      color: "from-purple-600 to-pink-600",
    },
  ];

  const tutors = [
    {
      name: "Dr. Sarah Chen",
      subject: "Data Science",
      image:
        " https://images.unsplash.com/photo-1680516426618-bde74c53723c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHwzZCUyMHJlbmRlciUyMGVkdWN0YWlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Prof. Michael Rodriguez",
      subject: "Web Development",
      image:
        " https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Dr. Emily Johnson",
      subject: "Machine Learning",
      image:
        " https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Prof. David Kim",
      subject: "UI/UX Design",
      image:
        " https://images.unsplash.com/photo-1680516426618-bde74c53723c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHwzZCUyMHJlbmRlciUyMGVkdWN0YWlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Dr. Lisa Wang",
      subject: "Digital Marketing",
      image:
        " https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Prof. James Wilson",
      subject: "Cybersecurity",
      image:
        " https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHwzZCUyMHJlbmRlciUyMGVkdWN0YWlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentHeroSlide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
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

        .float-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes moveRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          display: flex;
          width: max-content;
          animation: moveRight 40s linear infinite;
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

      {/* Header with Logout */}
      <header className="flex justify-between items-center px-8 py-4 backdrop-blur-md glass-effect border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-700 dark:text-white">
            SikshaWeb
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Logout
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              {currentHeroSlide.subtitle}
            </span>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {currentHeroSlide.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {currentHeroSlide.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
             <button
       onClick={() => navigate("/courses")}
       className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
   >
    <Play className="w-4 h-4 mr-1 inline" /> Start Learning
        </button>

              <button
                onClick={() => navigate("/courses")}
                className="text-indigo-600 hover:underline font-medium"
              >
                Browse Courses
              </button>

            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  50K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Students
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  1K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Courses
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  95%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
          {/* Image card */}
          <div
            className={`bg-gradient-to-br ${currentHeroSlide.color} rounded-3xl p-6 shadow-xl tilt-card`}
          >
            <div className="tilt-card-inner glass-effect p-4 rounded-xl backdrop-blur-sm">
              <img
                src={currentHeroSlide.image}
                alt={currentHeroSlide.title}
                className="rounded-xl w-full h-64 object-cover shadow-lg"
              />
              <div className="mt-4 text-white">
                <h3 className="text-xl font-semibold">
                  {currentHeroSlide.title}
                </h3>
                <p className="text-sm opacity-80">
                  {currentHeroSlide.subtitle}
                </p>
              </div>
            </div>
            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
<section className="py-24 bg-gradient-to-br from-slate-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative overflow-hidden">
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute w-full h-full bg-grid-pattern bg-repeat opacity-30"></div>
  </div>

  <div className="max-w-7xl mx-auto px-8 relative z-10">
    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
      Explore What We Offer
    </h2>
    <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
      Choose from a wide variety of courses, tools, and learning experiences crafted for excellence.
    </p>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left Column - Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 glass-effect transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Premium Learning Paths
          </h3>
        </div>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Expert-designed course pathways</span>
          </li>
          <li className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Certified programs from top educators</span>
          </li>
          <li className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span>Hands-on projects & real-world skills</span>
          </li>
        </ul>
        <button
  onClick={() => navigate("/courses")}
  className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
>
  <span>Browse Courses</span>
  <ChevronRight className="w-5 h-5" />
</button>

      </div>

      {/* Right Column - Features */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-6">Why Our Platform Stands Out</h3>
          <ul className="space-y-4">
            {[
              "Personalized learning experience",
              "Offline access & mobile compatibility",
              "Live mentorship sessions available",
              "Interactive quizzes & assessments",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <Play className="w-5 h-5 text-yellow-300 mt-0.5 rotate-90" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 w-full border border-white/30 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Tutors section */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Meet Our Top Instructors
          </h2>
          <div className="overflow-hidden relative h-40">
            <div className="flex animate-slide gap-10">
              {[...tutors, ...tutors].map((tutor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 group"
                >
                  <div className="transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-full shadow-lg">
                    <div className="bg-white p-1 rounded-full">
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {tutor.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tutor.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>
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

      

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose SikshaWeb?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: BookOpen,
                title: "Expert-Led Courses",
                description:
                  "Learn from professionals with real-world experience",
              },
              {
                icon: Users,
                title: "Community Learning",
                description:
                  "Collaborate with fellow learners and grow together",
              },
              {
                icon: Trophy,
                title: "Career Certificates",
                description:
                  "Earn credentials that boost your professional profile",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group tilt-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="tilt-card-inner">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center rounded-xl mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}