"use client"

import { useEffect, useState } from "react";
import type { Connection} from "@prisma/client";

import { getConnections } from "../actions/misc";

const useConnections = () => {
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        const fetchConnections = async () => {
            const connections = await getConnections();
            setConnections(connections);
        };
        fetchConnections();
    }, []);

  return {connections, setConnections};
}

export default useConnections