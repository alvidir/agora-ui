const projectNameRegex = /^[^/]+$/;
const maxFilenameLen = 34;

interface Project {
  id: string;
  name: string;
  description: string;
  highlight: boolean;
  cardinalities: { [key: string]: number };
}

const checkProjectName = (name: string): string | undefined => {
  if (!name) {
    return "A name cannot be empty";
  }

  if (!name.match(projectNameRegex)) {
    return "A name cannot contains slashes.";
  }

  if (name.length > maxFilenameLen) {
    return `A name cannot exceed ${maxFilenameLen} characters long.`;
  }
};

const getId = (project: Project): string => {
  if (!project.id.includes(":")) return project.id;
  return project.id.slice(project.id.indexOf(":") + 1);
};

export { Project, checkProjectName, getId };
