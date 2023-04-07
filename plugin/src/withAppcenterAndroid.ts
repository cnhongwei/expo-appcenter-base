import {
  ConfigPlugin,
  withStringsXml,
  AndroidConfig,
  withDangerousMod,
} from "@expo/config-plugins";
import { copyFilePathToPathAsync } from "@expo/config-plugins/build/utils/fs";
import * as path from "path";

import { AppcenterConfig } from "./type";

const DEFAULT_TARGET_PATH =
  "./android/app/src/main/assets/appcenter-config.json";
export async function setGoogleServicesFile(
  config: Pick<AppcenterConfig, "androidKeyFile">,
  projectRoot: string,
  targetPath: string = DEFAULT_TARGET_PATH
) {
  const partialSourcePath = config.androidKeyFile;
  if (!partialSourcePath) {
    return false;
  }

  const completeSourcePath = path.resolve(projectRoot, partialSourcePath);
  const destinationPath = path.resolve(projectRoot, targetPath);

  try {
    await copyFilePathToPathAsync(completeSourcePath, destinationPath);
  } catch (e) {
    console.log(e);
    throw new Error(
      `Cannot copy appcenter-config.json from ${completeSourcePath} to ${destinationPath}. Please make sure the source and destination paths exist.`
    );
  }
  return true;
}

/**
 * Add `appcenter-config.json` to project
 */
export const withAppcenterFile: ConfigPlugin<AppcenterConfig> = (
  config,
  appcenterConfig
) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      await setGoogleServicesFile(
        appcenterConfig,
        config.modRequest.projectRoot
      );
      return config;
    },
  ]);
};

export const withAppcenterAndroid: ConfigPlugin<AppcenterConfig> = (
  config,
  appcenterConfig
) => {
  config = withStringsXml(config, (config) => {
    config.modResults = AndroidConfig.Strings.setStringItem(
      [
        // XML represented as JSON
        // <string name="appCenterAnalytics_whenToEnableAnalytics" translatable="false" moduleConfig="true">ALWAYS_SEND</string>
        {
          $: {
            name: "appCenterAnalytics_whenToEnableAnalytics",
            translatable: "false",
            // @ts-ignore
            moduleConfig: "true",
          },
          _: "ALWAYS_SEND",
        },
      ],
      config.modResults
    );
    return config;
  });

  config = withAppcenterFile(config, appcenterConfig);

  return config;
};
