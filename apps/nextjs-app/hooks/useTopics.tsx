import { useQuery } from '@tanstack/react-query';
import { getTopics } from '../actions/syllabus';

const useTopics = (projectId: string, poll = false) => {
  return useQuery({
    queryKey: ['topics', projectId],
    queryFn: () => getTopics(projectId),
    enabled: !!projectId,
    refetchInterval: poll ? 60 * 1000 : false,
    staleTime: 0,                // force refetch on focus or param change
  });
};
export default useTopics;
