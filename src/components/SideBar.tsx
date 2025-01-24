import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";

function SideBar() {
    const sidebarContent = (
      <>
            <NewDocumentButton />
            
            
      </>
    );
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              {sidebarContent}
            </SheetHeader>
          </SheetContent>
        </Sheet>{" "}
      </div>
      <div className="hidden md:block">
        <section>{sidebarContent}</section>
      </div>
    </>
  );
}
export default SideBar;
