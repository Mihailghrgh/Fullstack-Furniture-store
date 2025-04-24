"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  XIcon,
  EmailIcon,
  FacebookIcon,
  BlueskyIcon,
  LinkedinIcon,
} from "react-share";
import {
  TwitterShareButton,
  FacebookShareButton,
  BlueskyShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p2 rounded-full bg-secondary">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex gap-x-2 items-center justify-center w-full"
      >
        <TwitterShareButton url={shareLink} title={name}>
          <XIcon
            className="hover:scale-125 transition-transform duration-200"
            size={24}
            round
          />
        </TwitterShareButton>
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon
            className="hover:scale-125 transition-transform duration-200"
            size={24}
            round
          />
        </FacebookShareButton>
        <BlueskyShareButton url={shareLink} title={name}>
          <BlueskyIcon
            className="hover:scale-125 transition-transform duration-200"
            size={24}
            round
          />
        </BlueskyShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon
            className="hover:scale-125 transition-transform duration-200"
            size={24}
            round
          />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon
            className="hover:scale-125 transition-transform duration-200"
            size={24}
            round
          />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
