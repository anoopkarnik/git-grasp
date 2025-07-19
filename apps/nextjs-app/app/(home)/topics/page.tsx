"use client";
import React, { useEffect, useMemo, useState } from "react";
import useProject from "../../../hooks/useProject";
import { createSyllabus } from "../../../actions/syllabus";
import { Button } from "@repo/ui/atoms/shadcn/button";
import useTopics from "../../../hooks/useTopics";
import ByTopicsTab from "../../../components/organisms/ByTopicsTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/molecules/shadcn/tabs";
import ByLanguagesTab from "../../../components/organisms/ByLanguagesTab";
import ByFrameworksTab from "../../../components/organisms/ByFrameworksTab";

const Dashboard = () => {
  const { project, projectId } = useProject();
  const [agentRunning, setAgentRunning] = useState(false);
  const { data, isLoading } = useTopics(projectId ?? "", agentRunning);

  const status = data?.status ?? "NoSyllabus";
  const topics = useMemo(() => data?.topics ?? [], [data]);

  // Reset state when projectId changes
  useEffect(() => {
    if (!projectId) return;        
    setAgentRunning(false);
  }, [projectId]);

  // Automatically stop polling if topics arrive
  useEffect(() => {
    if (agentRunning && topics.length > 0) {
      setAgentRunning(false);
    }
  }, [topics, agentRunning]);

  const createSyllabusAndTopics = async () => {
    if (!projectId) return;
    try {
      setAgentRunning(true);
      await createSyllabus(projectId);
    } catch (error) {
      setAgentRunning(false);
      console.error("Error creating syllabus and topics:", error);
    }
  };

  const showCreateUI = status === "NoSyllabus";
  const showProcessingUI = status === "processing" || agentRunning;
  const showTabs = !isLoading && topics.length > 0;

  return (
    <div className="mx-4">
      {project && (
        <Tabs defaultValue="byTopics" className="w-full">
          <TabsList>
            <TabsTrigger value="byTopics">By Topics</TabsTrigger>
            <TabsTrigger value="byLanguages">By Languages</TabsTrigger>
            <TabsTrigger value="byFrameworks">By Frameworks</TabsTrigger>
          </TabsList>

          {showCreateUI && (
            <div className="flex flex-col items-center justify-center p-4 gap-6">
              <div className="text-description">No topics generated yet.</div>
              <Button onClick={createSyllabusAndTopics} disabled={!projectId}>
                Create Topics for this project
              </Button>
            </div>
          )}

          {showProcessingUI && (
            <div className="flex flex-col items-center justify-center p-4 gap-6">
              <div className="text-description">
                Generating topics... It may take 10–20 minutes.
              </div>
              <Button disabled>Please wait...</Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center text-description mt-6">
              Loading topics...
            </div>
          )}

          {showTabs && (
            <>
              <TabsContent value="byTopics">
                <ByTopicsTab />
              </TabsContent>
              <TabsContent value="byLanguages">
                <ByLanguagesTab />
              </TabsContent>
              <TabsContent value="byFrameworks">
                <ByFrameworksTab />
              </TabsContent>
            </>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
