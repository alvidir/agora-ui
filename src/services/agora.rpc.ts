import * as grpcWeb from "grpc-web";
import { Warning, getWarning } from "@/warning";
import { ProjectServiceClient } from "@/proto/ProjectServiceClientPb";
import urlJoin from "url-join";
import { Project } from "@/project";
import {
  Project as ProtoProject,
  ProjectList as ProtoProjectList,
  ProjectWithCardinalities as ProtoProjectWithCardinalities,
  Empty as ProtoEmpty,
} from "@/proto/project_pb";
import config from "@/config.json";

const url = urlJoin(config.AGORA_BASE_URI, "rpc");

const projectClient = new ProjectServiceClient(url, null, null);

const headers: { [key: string]: string } = {};
if (process.env.NODE_ENV === "development") {
  headers["X-Uid"] = "1";
}

const buildProject = (data: ProtoProject | undefined): Project => {
  console.log(data);
  return {
    id: data?.getId() ?? "",
    name: data?.getName() ?? "",
    description: data?.getDescription() ?? "",
    highlight: data?.getHighlight() ?? false,
    cardinalities: {},
  };
};

const buildProjectWithCardinalities = (
  data: ProtoProjectWithCardinalities
): Project => {
  const project = buildProject(data.getProject());
  data.getCardinalitiesList().forEach((data) => {
    project.cardinalities[data.getName()] = data.getValue();
  });

  return project;
};

const listProjects = (): Promise<Array<Project>> => {
  return new Promise(
    (
      resolve: (value: Array<Project> | PromiseLike<Array<Project>>) => void,
      reject: (reason: Warning) => void
    ) => {
      const request = new ProtoEmpty();

      projectClient.list(
        request,
        headers,
        (err: grpcWeb.RpcError, data: ProtoProjectList) => {
          if (err && err.code !== grpcWeb.StatusCode.OK) {
            reject(getWarning(err.message));
            return;
          }

          resolve(data.getProjectsList().map(buildProjectWithCardinalities));
        }
      );
    }
  );
};

const createProject = (project: Project): Promise<Project> => {
  return new Promise(
    (
      resolve: (value: Project | PromiseLike<Project>) => void,
      reject: (reason: Warning) => void
    ) => {
      const request = new ProtoProject()
        .setName(project.name)
        .setHighlight(project.highlight);

      projectClient.create(
        request,
        headers,
        (err: grpcWeb.RpcError, data: ProtoProject) => {
          if (err && err.code !== grpcWeb.StatusCode.OK) {
            console.log(err);
            reject(getWarning(err.message));
            return;
          }

          resolve(buildProject(data));
        }
      );
    }
  );
};

export { listProjects, createProject };
