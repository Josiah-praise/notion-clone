'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import Documents from "./Documents";
import { useState } from "react";
import { useCallback } from "react";

function SideBarContent({ handleClick }: { handleClick: () => void }) {
  return (
    <div>
      <NewDocumentButton handleClick={handleClick} />
      <Documents handleClick={handleClick} />
    </div>
  );
}

function SideBar() {
  const [isOpen, setIsopen] = useState(false);
  const handleClick = useCallback(() => {
    setIsopen(!isOpen);
  }, [isOpen]);
  // const sidebarContent = (
  //   <div>
  //     <NewDocumentButton />
  //     <Documents />
  //   </div>
  // );
  return (
    <>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsopen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SideBarContent handleClick={handleClick} />
            </SheetHeader>
          </SheetContent>
        </Sheet>{" "}
      </div>
      <div className="hidden md:block">
        <section><SideBarContent handleClick={() => { }}/></section>
      </div>
    </>
  );
}
export default SideBar;
