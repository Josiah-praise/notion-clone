"use client";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import { query, collectionGroup, where } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import SingleDocument from "./SingleDocument";

type FilteredIds = {
  mine: Array<string>;
  others: Array<string>;
};

function Documents({ handleClick }: { handleClick: () => void }) {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || " ";
  const q = useMemo(
    () =>
      query(collectionGroup(db, "members"), where("userId", "==", userEmail)),
    [userEmail]
  );
  const [snapshot, loading, error] = useCollection(q);
  const [docIds, setDocIds] = useState<FilteredIds>({ mine: [], others: [] });

  useEffect(() => {
    if (!snapshot || error) return;
    const filteredIds = snapshot.docs.reduce(
      (acc: FilteredIds, doc) => {
        if (doc.data().role == "owner") {
          acc.mine.push(doc.data().docId);
        } else {
          acc.others.push(doc.data().docId);
        }
        return acc;
      },
      { mine: [], others: [] }
    );

    setDocIds({
      mine: filteredIds.mine,
      others: filteredIds.others,
    });
  }, [snapshot, error]);

  if (loading) return <div className="text-center">Loading....</div>;
  if (error) return <div className="text-center">Something went wrong</div>;

  return (
    <>
      <div className="my-4">
        <p className="text-center mb-2 font-medium border-b border-gray-300 text-gray-600">
          My documents
        </p>
        <div className="w-full flex-col flex gap-2 text-center">
          {snapshot &&
            (snapshot.docs.length > 0
              ? docIds.mine.map((id: string) => (
                  <SingleDocument key={id} id={id} handleClick={handleClick} />
                ))
              : "🤷‍♀️ No documents 🤷‍♀️")}
        </div>
      </div>
      <div className="my-4">
        <p className="text-center mb-2 font-medium  border-b border-gray-300 text-gray-600">
          Shared Documents
        </p>
        <div className="w-full flex-col flex gap-5 text-center">
          {snapshot &&
            (snapshot?.docs.length > 0
              ? docIds.others.map((id: string) => (
                  <SingleDocument key={id} id={id} handleClick={handleClick} />
                ))
              : "🤷‍♀️ No documents 🤷‍♀️")}
        </div>
      </div>
    </>
  );
}
export default Documents;
