
import { redirect} from "next/navigation";
import { getCourse } from "../../../../../../actions/getCourse";
import ErrorPage from "@/components/error";

export default async function LandingPage({params:{courseId}}:{
  params:{courseId:string}
}) {
  const {course,error} = await getCourse(courseId)
  if(error) return <ErrorPage name={error.name}/>

  if(!course) return redirect("/free-52-weeks")
    return redirect(`/free-52-weeks/${courseId}/chapters/${course.chapters[0].id}`)
  // const [form, setForm] = useState({ name: "", email: "", phone: "" });


  // const router = useRouter()


  // const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK";

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const message = `Hello, my name is ${form.name}. I just registered for the Free 52 Weeks Frontend Web Development Program.`;
  //   const adminWhatsApp = `https://wa.me/2348012345678?text=${encodeURIComponent(message)}`;

  //   window.open(adminWhatsApp, "_blank");
  //   setTimeout(() => {
  //     window.location.href = WHATSAPP_GROUP_LINK;
  //   }, 1200);
  // };

  // const features = [
  //   "52 weeks structured roadmap",
  //   "Live weekly classes",
  //   "Beginner to job-ready skills",
  //   "HTML, CSS, JavaScript, React & Next.js",
  //   "Hands-on projects",
  //   "Book & chapter recommendations",
  //   "Strong Nigerian tech focus",
  //   "100% Free learning",
  // ];

  // const curriculum = [
  //   "Weeks 1–4: Web & HTML Basics",
  //   "Weeks 5–8: CSS & Responsive Design",
  //   "Weeks 9–16: JavaScript Deep Dive",
  //   "Weeks 17–28: React & State Management",
  //   "Weeks 29–40: Advanced Projects",
  //   "Weeks 41–52: Portfolio & Job Prep",
  // ];

  // const faqs = [
  //   { q: "Is this program really free?", a: "Yes, completely free." },
  //   { q: "Do I need a laptop?", a: "Yes, a laptop and internet access." },
  //   { q: "Who can join?", a: "Anyone in Nigeria interested in tech." },
  // ];

  // return (
  //   <main className="bg-slate-50 text-gray-800">
  //     {/* HERO */}
  //     <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white">
  //       <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
  //         <div>
  //           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
  //             Free 52‑Week Frontend Web Development Program
  //           </h1>
  //           <p className="text-lg mb-8">
  //             Learn frontend development from beginner to professional with live
  //             weekly classes designed specifically for Nigerians.
  //           </p>
  //           <button
  //             onClick={()=>{
  //               router.push("/free-52-weeks/18474722-8727-4938-9f46-f01ab32e0e32/chapters/ae532c83-1faa-4e7d-8fe0-3f16c6b8a5c0/")
  //             }}
  //             className="inline-block bg-white text-green-700 px-8 py-4 rounded-2xl font-semibold shadow hover:scale-105 transition"
  //           >
  //             Join Free Class
  //           </button>
  //         </div>
  //         <div className="hidden md:block">
  //           <div className="bg-white/10 backdrop-blur p-8 rounded-3xl shadow-xl">
  //             <h3 className="text-xl font-semibold mb-4">What You’ll Learn</h3>
  //             <ul className="space-y-3">
  //               {features.slice(0, 5).map((f, i) => (
  //                 <li key={i} className="flex gap-2 items-center">
  //                   <CheckCircle className="text-white" /> {f}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* FEATURES */}
  //     <section className="max-w-7xl mx-auto px-6 py-20">
  //       <h2 className="text-3xl font-bold text-center mb-12">
  //         Why Join This Program?
  //       </h2>
  //       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
  //         {features.map((f, i) => (
  //           <div
  //             key={i}
  //             className="bg-white p-6 rounded-3xl shadow hover:-translate-y-1 transition"
  //           >
  //             <CheckCircle className="text-green-600 mb-4" size={32} />
  //             <p className="font-medium">{f}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </section>

  //     {/* CURRICULUM */}
  //     <section className="bg-white py-20">
  //       <div className="max-w-5xl mx-auto px-6">
  //         <h2 className="text-3xl font-bold text-center mb-10">
  //           52‑Week Learning Roadmap
  //         </h2>
  //         <div className="grid md:grid-cols-2 gap-6">
  //           {curriculum.map((c, i) => (
  //             <div key={i} className="flex gap-3 bg-slate-50 p-5 rounded-2xl">
  //               <BookOpen className="text-green-600" />
  //               <span>{c}</span>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* INSTRUCTOR */}
  //     <section className="bg-slate-50 py-20">
  //       <div className="max-w-4xl mx-auto px-6 text-center">
  //         <User className="mx-auto text-green-600 mb-4" size={56} />
  //         <h2 className="text-3xl font-bold mb-4">Your Instructor</h2>
  //         <p>
  //           Paulson Simplifies Programming is a Nigerian software developer and
  //           educator helping beginners break into tech through practical and
  //           beginner‑friendly teaching.
  //         </p>
  //       </div>
  //     </section>

  //     {/* TESTIMONIALS */}
  //     <section className="bg-gradient-to-r from-emerald-50 to-green-50 py-20">
  //       <div className="max-w-6xl mx-auto px-6">
  //         <h2 className="text-3xl font-bold text-center mb-12">
  //           Student Success Stories
  //         </h2>
  //         <div className="grid md:grid-cols-3 gap-8">
  //           {["I built my first website in 2 weeks", "Clear and beginner‑friendly", "Best free tech program"].map(
  //             (t, i) => (
  //               <div key={i} className="bg-white p-6 rounded-3xl shadow">
  //                 <div className="flex mb-3">
  //                   {[...Array(5)].map((_, j) => (
  //                     <Star key={j} className="text-yellow-400" />
  //                   ))}
  //                 </div>
  //                 <p>“{t}”</p>
  //                 <p className="mt-4 font-semibold">— Nigerian Student</p>
  //               </div>
  //             )
  //           )}
  //         </div>
  //       </div>
  //     </section>

  //     {/* FAQ */}
  //     <section className="bg-white py-20">
  //       <div className="max-w-4xl mx-auto px-6">
  //         <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
  //         <div className="space-y-4">
  //           {faqs.map((f, i) => (
  //             <div key={i} className="border rounded-2xl p-5">
  //               <h3 className="font-semibold flex items-center gap-2">
  //                 <HelpCircle className="text-green-600" /> {f.q}
  //               </h3>
  //               <p className="mt-2 text-gray-600">{f.a}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* REGISTER */}
  //     <section
  //       id="register"
  //       className="bg-gradient-to-r from-green-600 to-emerald-500 py-20"
  //     >
  //       <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl">
  //         <h2 className="text-2xl font-bold text-center mb-6">
  //           Register & Join WhatsApp Class
  //         </h2>
  //         <form onSubmit={handleSubmit} className="space-y-4">
  //           <input
  //             className="w-full p-3 rounded border"
  //             placeholder="Full Name"
  //             required
  //             value={form.name}
  //             onChange={(e) => setForm({ ...form, name: e.target.value })}
  //           />
  //           <input
  //             className="w-full p-3 rounded border"
  //             placeholder="Email Address"
  //             type="email"
  //             required
  //             value={form.email}
  //             onChange={(e) => setForm({ ...form, email: e.target.value })}
  //           />
  //           <input
  //             className="w-full p-3 rounded border"
  //             placeholder="WhatsApp Number"
  //             required
  //             value={form.phone}
  //             onChange={(e) => setForm({ ...form, phone: e.target.value })}
  //           />
  //           <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
  //             Join Free Program
  //           </button>
  //         </form>
  //       </div>
  //     </section>
  //   </main>
  // );
}
