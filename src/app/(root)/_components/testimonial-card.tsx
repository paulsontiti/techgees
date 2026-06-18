"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFullNameInitials } from "@/utils/getNameInitials";

import FbIcon from "@/components/fb-icon";
import WhatsAppIcon from "@/components/whatsApp-icon";
import { Testimonial } from "../data/types/testimonial.type";



type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: Props) {
  const initials = getFullNameInitials(
    testimonial.fullName
  );

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        h-full
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-blue-500/30
        hover:shadow-2xl
        hover:shadow-blue-500/10
      "
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <MessageSquareQuote
          className="
            h-10
            w-10
            text-blue-400
            opacity-70
          "
        />
      </div>

      {/* Rating */}
      <div className="mb-6 flex">
        {Array.from({
          length: testimonial.rating,
        }).map((_, i) => (
          <span
            key={i}
            className="text-xl text-yellow-400"
          >
            ★
          </span>
        ))}
      </div>

      {/* Review */}
      <p
        className="
          min-h-[120px]
          text-sm
          leading-relaxed
          text-slate-300
        "
      >
        "{testimonial.review}"
      </p>

      {/* Divider */}
      <div className="my-6 border-t border-white/10" />

      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={testimonial.imgUrl}
              alt={testimonial.fullName}
            />

            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-white">
              {testimonial.fullName}
            </h3>

            <p className="text-sm text-slate-400">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          {testimonial.facebookLink && (
            <Link
              href={testimonial.facebookLink}
              target="_blank"
            >
              <FbIcon />
            </Link>
          )}

          {testimonial.whatsAppLink && (
            <Link
              href={testimonial.whatsAppLink}
              target="_blank"
            >
              <WhatsAppIcon />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}