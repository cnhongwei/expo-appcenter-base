import {
  ConfigPlugin,
  XcodeProject,
  withXcodeProject,
} from "@expo/config-plugins";
import { getSourceRoot } from "@expo/config-plugins/build/ios/Paths";
import {
  getProjectName,
  addResourceFileToGroup,
} from "@expo/config-plugins/build/ios/utils/Xcodeproj";
import * as fs from "fs";
import * as path from "path";
import { AppcenterConfig } from "./type";

export function setAppcenterFile(
  config: Pick<AppcenterConfig, "iosKeyFile">,
  { projectRoot, project }: { project: XcodeProject; projectRoot: string }
): XcodeProject {
  const iosKeyFileRelativePath = config.iosKeyFile;
  if (iosKeyFileRelativePath === null) {
    return project;
  }

  const iosKeyFilePath = path.resolve(projectRoot, iosKeyFileRelativePath);

  fs.copyFileSync(
    iosKeyFilePath,
    path.join(getSourceRoot(projectRoot), "AppCenter-Config.plist")
  );

  const projectName = getProjectName(projectRoot);
  const plistFilePath = `${projectName}/AppCenter-Config.plist`;
  if (!project.hasFile(plistFilePath)) {
    project = addResourceFileToGroup({
      filepath: plistFilePath,
      groupName: projectName,
      project,
      isBuildFile: true,
      verbose: true,
    });
  }
  return project;
}

export const withAppcenterIos: ConfigPlugin<AppcenterConfig> = (
  config,
  appcenterConfig
) => {
  config = withXcodeProject(config, (config) => {
    config.modResults = setAppcenterFile(appcenterConfig, {
      projectRoot: config.modRequest.projectRoot,
      project: config.modResults,
    });
    return config;
  });
  return config;
};
