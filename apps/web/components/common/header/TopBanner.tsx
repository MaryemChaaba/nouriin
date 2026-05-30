import React from "react";
import Container from "../Container";
// import { topHelpCenter } from "@/constants/data";
// import Link from "next/link";
import TopSocialLinksClient from "./TopSocialLinksClient";
import SelectCurrency from "./SelectCurrency";
import SelectLanguage from "./SelectLanguage";
import { Phone } from "lucide-react";

const TopBanner = () => {
  return (
    <div className="w-full bg-primary text-primary-foreground py-2 text-sm font-medium border-b border-b-border/20">
      <Container className="flex items-center justify-between">
        <p className="text-center flex gap-1 justify-center items-center">
          <Phone className="w-5 h-5" /> <span>57 031 433</span>
        </p>
        <div className="flex items-center justify-end">
          {/* <SelectLanguage /> */}
          {/* <SelectCurrency /> */}
          <TopSocialLinksClient />
        </div>
      </Container>
    </div>
  );
};

export default TopBanner;
