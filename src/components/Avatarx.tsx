"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Avatars() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];

  
   return (<div className="flex gap-2 items-center">
    <p className="font-light text-sm hidden md:block">Users currently editing this page</p>
    <div className="flex -space-x-5">
      {all.map((other, i) => (
        <TooltipProvider key={other.id + i}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="border-2 hover:z-50 h-[30px] w-[30px] md:h-[40px] md:w-[40px]">
                <AvatarImage src={other.info.avatar} alt={other.info.name} />
                <AvatarFallback>{other.info.name}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{self?.id === other.id ? "You" : other.info.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  </div>);
}

export default Avatars;
