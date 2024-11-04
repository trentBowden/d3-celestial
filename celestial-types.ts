// types.ts

// Projection configuration and settings types
export interface ProjectionSettings {
  scale: number;
  ratio: number;
  clip?: boolean;
}

export interface Config {
  width?: number;
  projection: string;
  transform: string;
  center: number[];
  geopos?: number[];
  follow: string;
  orientationfixed: boolean;
  zoomlevel: number | null;
  zoomextend: number;
  adaptable: boolean;
  interactive: boolean;
  form: boolean;
  location: boolean;
  formFields: Record<string, boolean>;
  advanced: boolean;
  daterange?: (number | string)[];
  controls: boolean;
  lang: string;
  culture: string;
  container: string;
  datapath: string;
  stars: StarConfig;
  dsos: DsoConfig;
}

export interface StarConfig {
  show: boolean;
  limit: number;
  colors: boolean;
  style: Style;
  designation: boolean;
  designationType: string;
  designationStyle: TextStyle;
  designationLimit: number;
  propername: boolean;
  propernameType: string;
  propernameStyle: TextStyle;
  propernameLimit: number;
  size: number;
  exponent: number;
  data: string;
}

export interface DsoConfig {
  show: boolean;
  limit: number;
  colors: boolean;
  style: Style;
  names: boolean;
  namesType: string;
}

export interface Style {
  fill?: string;
  stroke?: string;
  width?: number;
  opacity?: number;
}

export interface TextStyle extends Style {
  font: string;
  align: CanvasTextAlign;
  baseline: CanvasTextBaseline;
}

export interface Animation {
  param: string;
  value: any;
  duration: number;
  callback?: () => void;
}

// Celestial module main interface
export interface Celestial {
  version: string;
  container: HTMLElement | null;
  data: any[];
  display(config: Config): void;
  projection(proj: string): d3.GeoProjection;
  rotate(config: { center: number[] }): void;
  zoomBy(factor: number): number;
  animate(animations: Animation[], repeat: boolean): void;
  reload(config?: Config): void;
  resize(config?: { width?: number }): void;
  clear(): void;
  redraw(): void;
  add(data: any): void;
  remove(index: number): any;
  runCallback(): void;
  setStyle(style: Style): void;
}

// Utility function interfaces
export interface EulerAngle {
  [key: string]: number[];
}

export type TranslateFunction = (coords: number[], euler: number[]) => number[];
