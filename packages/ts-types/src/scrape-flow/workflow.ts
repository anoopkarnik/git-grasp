import {LucideIcon, LucideProps} from "lucide-react";
import React from "react";
import { AppNode, TaskParam, TaskType } from "./node";
import { Browser, Page } from "puppeteer";
import { LogCollector } from "./log";

export interface CustomDialogHeaderProps {
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    titleClassName?: string;
    subTitleClassName?: string;
    iconClassName?: string;
}

export enum WorkflowStatus{
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
}

export interface TooltipWrapperProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export interface DeleteWorkflowDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}

export type WorkflowTask = {
    label: string;
    icon: React.FC<LucideProps>;
    type: TaskType;
    isEntryPoint?: boolean;
    inputs: TaskParam[];
    outputs: TaskParam[];
    credits: number;

}

export type WorkflowExecutionPlanPhase = {
    phase: number;
    nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];

export enum WorkflowExecutionStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum ExecutionPhaseStatus {
    CREATED = 'CREATED',
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum WorkflowExecutionTrigger {
    MANUAL = "MANUAL",
    CRON = "CRON",
}

export type Environment = {
    browser?: Browser;
    page?: Page;
    phases: Record<string, {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        }>
    }

export type ExecutionEnvironment<T extends WorkflowTask> = {
    getInput(name:T["inputs"][number]["name"]): string | undefined;
    setOutput(name:T["outputs"][number]["name"], value:string): void;

    getBrowser(): Browser | undefined;
    setBrowser(browser: Browser): void;

    getPage(): Page | undefined;
    setPage(page: Page): void;

    log: LogCollector;

}