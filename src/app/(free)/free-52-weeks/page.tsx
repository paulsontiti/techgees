
import { CheckCircle,HelpCircle, Star } from "lucide-react";
import Image from "next/image";
import CourseButton from "./_components/course-button";
import { getUserCookie } from "@/lib/get-user-cookie";
import Navbar from "@/app/(root)/_components/nav-bar";
import { gradient } from "@/utils/colors";
import RefererId from "./_components/referer-id";


export default async function LandingPage({
  searchParams:{refererId}
}:{searchParams:{refererId:string}}) {

  const userId = await getUserCookie()


  const features = [
    {
      title: "Structured 52-Week Curriculum",
      desc: "A carefully designed weekly roadmap that takes you from absolute beginner to job-ready, without confusion or overwhelm.",
    },
    {
      title: "100% Free Learning",
      desc: "No hidden fees. No subscriptions. All lessons, projects, and resources are completely free.",
    },
    {
      title: "Beginner-Friendly Lessons",
      desc: "No tech background needed. Everything is explained step-by-step in simple language.",
    },
    {
      title: "Weekly Learning Schedule",
      desc: "Stay consistent with weekly lessons, tasks, and challenges that fit into your daily routine.",
    },
    {
      title: "Community Support",
      desc: "Join a WhatsApp & online community of learners to ask questions, share progress, and stay motivated.",
    },
    {
      title: "Video-Based Tutorials",
      desc: "Learn through clear, practical video lessons you can watch anytime, anywhere.",
    },
    {
      title: "Certificate of Participation",
      desc: "Receive a certificate after completing the program to showcase your commitment and skills.",
    },
    {
      title: "Career Guidance",
      desc: "Get tips on career paths, freelancing, internships, and job readiness, especially for beginners.",
    },
    {
      title: "Lifetime Access",
      desc: "Once you join, you get lifetime access to all learning materials and future updates.",
    },
    {
      title: "Zero Pressure Learning",
      desc: "Learn at your own pace — no deadlines, no penalties, just progress.",
    },
  ];

    const courses = [
    {
      id:"18474722-8727-4938-9f46-f01ab32e0e32",
      title: "Frontend Web Development",
      desc: "A carefully designed weekly roadmap that takes you from absolute beginner to job-ready, without confusion or overwhelm.",
    },
    {
      id:"",
      title: "Python, Game Development, AI and Machine Learning",
      desc: "No hidden fees. No subscriptions. All lessons, projects, and resources are completely free.",
    },
   
  ];



  const faqs = [
    {
      q: "Is this program really free?",
      a: "Yes. The entire 52-week tech program is 100% free. There are no hidden fees, subscriptions, or payments required.",
    },
    { q: "Do I need a laptop?", a: "Yes, a laptop and internet access." },
    { q: "Who can join?", a: "Anyone interested in tech." },
    {
      q: "Do I need any prior tech or coding experience?",
      a: "No. This program is designed for absolute beginners. Everything is taught step by step, from the basics.",
    },
    {
      q: "How long is the program?",
      a: "The program runs for 52 weeks (1 year), with structured lessons released weekly.",
    },
    {
      q: "How many hours do I need to study each week?",
      a: "You only need 5–10 hours per week, depending on your pace and commitment.",
    },
    {
      q: "What will I learn?",
      a: "You’ll learn tech fundamentals, web development, programming, real-world projects, and career skills needed to start a tech career.",
    },
        { q: "Will I build real projects?", a: "Yes. You’ll work on hands-on projects that you can add to your portfolio and GitHub." },
    { q: "Will I get a certificate?", a: "Yes. You’ll receive a certificate of participation after completing the program requirements." },
    { q: "Can I learn at my own pace?", a: "Yes. The lessons are flexible, and you can learn at your own pace while following the weekly roadmap." },
    { q: "How do I access the lessons?", a: "Lessons are delivered through video tutorials, resources, and community platforms after registration." },
   { q: "Is there a community or support group?", a: "Yes. You’ll be added to a WhatsApp community where you can ask questions, share progress, and get support." },
    { q: "What do I need to get started?", a: "A laptop/phone, internet connection, and a willingness to learn are all you need." },
  { q: "Can this help me get a job or freelance work?", a: "Yes, a laptop and internet access.Yes. The program focuses on practical skills, projects, and career readiness to help you start working in tech." },
    { q: "How do I join?", a: "Simply click “Join Free Now”, register, and you’ll get instant access to the learning resources and community." },
  ];

  return (
    <>
    <RefererId refererId={refererId}/>
      <header className="text-white">
           
            <Navbar/>
            </header>
    <section className="bg-slate-50 text-gray-800">
      {/* HERO */}
      <section className={`relative ${gradient}
      text-white`}>
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Start Your Tech Career in 52 Weeks — Free
            </h1>
            <p className="text-lg mb-8">
              A structured, beginner-friendly program with weekly lessons,
              projects, and community support.
            </p>
            {/* <a
              href="#register"
              className="inline-block bg-white text-green-700 px-2 py-2 rounded-2xl font-semibold shadow hover:scale-105 transition"
            >
              Join Free
            </a> */}
            <a
              href="#courses"
              className="inline-block ml-4 bg-white text-green-700 px-2 py-2 rounded-2xl font-semibold shadow hover:scale-105 transition"
            >
              View Courses
            </a>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">What You’ll Learn</h3>
              <ul className="space-y-3">
                {features.slice(0, 5).map((f, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle className="text-white" /> {f.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Join This Program?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow hover:-translate-y-1 transition"
            >
              <div className="flex gap-2">
                <CheckCircle className="text-green-600 mb-4" size={32} />
                <h2>{f.title}</h2>
              </div>
              <p className="font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Courses Available
          </h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow hover:-translate-y-1 transition"
            >
              <div className="flex gap-2">
                <h2 className="text-xl font-bold text-center mb-4">{course.title}</h2>
              </div>
              <p className="font-medium">{course.desc}</p>
             <CourseButton courseId={course.id} userId={userId}/>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          <Image 
          className="rounded-full"
          src="/assets/dp.jpg" alt="Instructor Picture" width={200} height={200}/>
          {/* <User className="mx-auto text-green-600 mb-4" size={56} /> */}
          <h2 className="text-3xl font-bold mb-4">Your Instructor</h2>
          <p>
            Paulson Simplifies Programming is a Nigerian software developer and
            educator helping beginners break into tech through practical and
            beginner‑friendly teaching.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "I built my first website in 2 weeks",
              "Clear and beginner‑friendly",
              "Best free tech program",
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="text-yellow-400" />
                  ))}
                </div>
                <p>“{t}”</p>
                <p className="mt-4 font-semibold">— Nigerian Student</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students Projects */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Student Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "I built my first website in 2 weeks",
              "Clear and beginner‑friendly",
              "Best free tech program",
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="text-yellow-400" />
                  ))}
                </div>
                <p>“{t}”</p>
                <p className="mt-4 font-semibold">— Nigerian Student</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border rounded-2xl p-5">
                <h3 className="font-semibold flex items-center gap-2">
                  <HelpCircle className="text-green-600" /> {f.q}
                </h3>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER
    <RegisterForm/> */}
    </section>
    </>
  );
}
