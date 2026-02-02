export type BuildMode = "production" | "development";
export type AnalyzeMode = "enabled" | "disabled";

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: AnalyzeMode;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  isAnalyzeModeEnable: boolean;
}
