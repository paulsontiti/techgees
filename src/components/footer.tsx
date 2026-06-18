import Link from "next/link";
import React from "react";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";

import CourseLinks from "./course-links";
import Logo from "./logo";
import FbIcon from "./fb-icon";
import IgIcon from "./ig-icon";
import WhatsAppIcon from "./whatsApp-icon";

const Footer = () => {
  return (
    <footer
      className={`mt-16 w-full p-4 md:p-10 text-white ${bgPrimaryColor}`}
    >
      <div className="mx-auto max-w-7xl border border-white/40 rounded-2xl flex flex-col md:flex-row gap-10 p-6 md:p-10">

        {/* Brand Section */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <Logo />

          <div className="flex items-center gap-4">
            <FbIcon />
            <IgIcon />
            <WhatsAppIcon />
          </div>
        </div>

        {/* Courses Section */}
        <div className="md:w-1/3">
          <h2 className={`text-xl font-semibold ${textSecondaryColor}`}>
            Courses
          </h2>
          <div className="mt-4">
            <CourseLinks />
          </div>
        </div>

        {/* Navigation Section */}
        <div className="md:w-1/3">
          <h2 className={`text-xl font-semibold ${textSecondaryColor}`}>
            The Global Genius
          </h2>

          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/">Home</Link>
            <Link href="/#whyus">Why Us</Link>
            <Link href="/courses/free">Free Courses</Link>
            <Link href="/#testimonials">Testimonials</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;