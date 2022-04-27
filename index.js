/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import UserExperior from "react-native-userexperior";

UserExperior.startRecording("a21b4684-4211-494a-aae2-8d09661d6de7");

AppRegistry.registerComponent(appName, () => App);
