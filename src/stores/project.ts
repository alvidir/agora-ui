import { defineStore } from "pinia";
import { reactive } from "vue";
import { Project } from "@/project";

export const useProjectStore = defineStore("project", () => {
  const projectById = reactive(new Map<string, Project>());

  const getProject = (id: string): Project | undefined => {
    return projectById.get(id);
  };

  const listProjects = (): Array<Project> => {
    return Array.from(projectById.values());
  };

  const addProject = (project: Project) => {
    projectById.set(project.id, project);
  };

  return {
    getProject,
    listProjects,
    addProject,
  };
});
