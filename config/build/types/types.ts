export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  public: string;
  src: string;
}
export type BuildMode = 'development' | 'production'
export type BuildPlatform = 'mobile' | 'desktop'
export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
  platform: BuildPlatform;
}
