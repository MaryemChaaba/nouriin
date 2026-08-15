"use client";

import React, { useState } from "react";
import TopFooter from "./TopFooter";
import HrLine from "../HrLine";
import Container from "../Container";
import { Title } from "../text";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { payment } from "../../../assets/image";
import { useSubscribe } from "../SubscriptionModal";

import { toast } from "sonner";

const informationTab = [
  { title: "About Us", href: "/about" },
  { title: "Top Searches", href: "/search" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms and Conditions", href: "/terms" },
  { title: "Testimonials", href: "/testimonials" },
];
const CustomerTab = [
  { title: "My Account", href: "/account" },
  { title: "Track Order", href: "/track-order" },
  { title: "Shop", href: "/shop" },
  { title: "Wishlist", href: "/wishlist" },
  { title: "Returns/Exchange", href: "/returns" },
];
const OthersTab = [
  { title: "Partnership Programs", href: "/programs" },
  { title: "Associate Program", href: "/programs" },
  { title: "Wholesale Socks", href: "/programs" },
  { title: "Wholesale Funny Socks", href: "/programs" },
  { title: "Others", href: "/others" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate network delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.error(
        "Newsletter Subscriptions are exclusive to the Premium setup.",
      );
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full flex flex-col">
      {/* Dark Footer Wrapper */}
      <TopFooter />
    </footer>
  );
};

export default Footer;
