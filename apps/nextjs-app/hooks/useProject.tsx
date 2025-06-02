"use client"
import { useCallback, useEffect, useState } from 'react'
import { getProjects } from '../actions/project'
import  {useLocalStorage} from "usehooks-ts"
import { GithubProject} from "@prisma/client"

const useProject = () => {
  const isClient = typeof window !== "undefined"; // Basic check
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [projectId, setProjectId] = isClient ? useLocalStorage<string | null>("projectId", null) : [null, () => {}];
  const [project, setProject] = useState<GithubProject>();

  const refreshProjects = useCallback(async () => {
    if (!isClient) return;
    const projects = await getProjects();
    setProjects(projects);
    if (projectId && projects.length > 0) {
      setProject(projects.find((project) => project.id === projectId));
    }
  }, [projectId, isClient]);

  useEffect(() => {
    if (!isClient) return;
    refreshProjects();
  }, [refreshProjects, isClient]);

  return { projects, projectId, project, setProjectId, refreshProjects };
};


export default useProject