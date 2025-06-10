import { sidebarFooterItemsProps, sidebarHeaderProps } from "@repo/ts-types/home/v1"
import {  Home, BoxesIcon, CoinsIcon, SchoolIcon, NotebookPenIcon, MessageCircleCodeIcon, FlaskConicalIcon, GitPullRequest, 
    FolderKanbanIcon, GraduationCapIcon, BugIcon, FileScanIcon} from "lucide-react"

export const sidebarItems:sidebarHeaderProps = 
{
    "Application":[
        {title: "Home", url: "/", icon: Home},
        {title: "Topics", url: "/topics", icon: SchoolIcon},
        {title: "Chat with Code", url: "/questions", icon: MessageCircleCodeIcon},
        {title: "Quizzes", url: "/quizzes", icon: FileScanIcon},
        {title: "Documentation Generator", url: "/documentation-generator", icon: NotebookPenIcon},
        {title: "Performance", url: "/performance", icon: GraduationCapIcon},
        {title: "Pull Request/Commit Analyzer", url: "/request-analyzer", icon: GitPullRequest},
        {title: "Vulnerability Scanner", url: "/vulnerability-scanner", icon: BugIcon},
        {title: "Code Structure Visualizer", url: "/code-structure-visualizer", icon: FolderKanbanIcon},
        {title: "Automated Testing", url: "/automated-testing", icon: FlaskConicalIcon},
        
    ],
    "Account":[
        {title: "Connections", url: "/connections", icon: BoxesIcon},
        {title: "Billing", url: "/billing", icon: CoinsIcon},
    ]
}

export const sidebarFooterItems:sidebarFooterItemsProps[] = 
[
        // {title: "Documentation", url: "#", icon: BookOpen},
        // {title: "Settings", url: "#", icon: Settings2},
        // {title: "Support", url: "https://mail.google.com/mail/u/0/?fs=1&to=support@bsamaritan.com&su=Help&tf=cm", icon: LifeBuoy},
        // {title: "Feedback", url: "#", icon: Send}
]



