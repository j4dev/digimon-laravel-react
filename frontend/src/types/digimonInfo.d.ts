/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DigimonInfoResponse {
  id: number;
  name: string;
  images: [Image];
  levels: [Level];
  types: [Type];
  attributes: [Attribute];
  fields: [Field];
}
export interface Image {
  href: string;
  transparent: boolean;
}
export interface Level {
  id: number;
  level: string;
}
export interface Type {
  id: number;
  type: string;
}
export interface Attribute {
  id: number;
  attribute: string;
}
export interface Field {
  id: number;
  field: string;
  image: string;
}
