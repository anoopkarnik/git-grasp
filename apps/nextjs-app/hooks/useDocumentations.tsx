import { useQuery } from "@tanstack/react-query";
import { getDocumentations } from "../actions/project";

const useDocumentations = (projectId: string, poll = false) => {
    return useQuery({
        queryKey: ['documentations', projectId],
        queryFn: () => getDocumentations(projectId),
        enabled: !!projectId,
        refetchInterval: poll ? 10 * 1000 : false,  // Only poll if "poll" is true
    });
}

export default useDocumentations;