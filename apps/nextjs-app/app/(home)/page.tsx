"use client";

import React from "react";
import { useSession } from "@repo/auth/better-auth/auth-client";
import LoadingCard from "@repo/ui/organisms/misc/LoadingCard/v1";

const Home = () => {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <LoadingCard title="Loading" description="Patience ia a virtue beyond anything" />;
  }


  return <div>
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
    </div>
};

export default Home;
