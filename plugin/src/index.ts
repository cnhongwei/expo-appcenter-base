import {
  ConfigPlugin,
  withInfoPlist,
  createRunOncePlugin,
} from "@expo/config-plugins";
import { withAppcenterAndroid } from "./withAppcenterAndroid";
import { AppcenterConfig } from "./type";
import { withAppcenterIos } from "./withAppcenterIos";

export const withAppcenter: ConfigPlugin<AppcenterConfig> = (
  config,
  appcenterConfig
) => {
  config = withAppcenterAndroid(config, appcenterConfig);
  config = withAppcenterIos(config, appcenterConfig);
  return config;
};
export default createRunOncePlugin(withAppcenter, "expo-appcenter", "1.0.0");
