import { ProjectConfigs } from '../components/projects/ProjectConfigs';

export const getAllProjects = () => ProjectConfigs;
export const getProject = (id: string) => ProjectConfigs.find((p) => p.id === id);
export const getProjectsForEntry = (entryId: string) => ProjectConfigs.filter((p) => p.timelineEntryId === entryId);
export const getFeaturedProjects = () => ProjectConfigs.filter((p) => p.featured);
