"use client";
import { doc, collection } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

function SingleDocument({
  id,
  handleClick,
}: {
  id: string;
  handleClick: () => void;
}) {
  const params = useParams<{id: string}>();
  const [value, loading] = useDocument(doc(collection(db, "documents"), id));

  if (loading) {
    return (
      <>
        <Skeleton className="p-1 text-center rounded border-12 cursor-pointer font-normal bg-slate-400 min-h-8" />
      </>
    );
  }
  return (
    <>
      <Link href={`/documents/${id}`}>
        {" "}
        <div onClick={handleClick}
          className={
            "p-1 text-center rounded border-12 cursor-pointer font-normal" +
            (params.id == id ? " bg-slate-400" : " bg-slate-300")
          }
        >
          {value &&
            (value.data()?.title.length > 10
              ? value.data()?.title.slice(0, 10) + "...."
              : value.data()?.title)}
        </div>
      </Link>
    </>
  );
}
export default SingleDocument;
