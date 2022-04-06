export type TaggedLibrarySchemaOptions = {
  name: string;
  type: 'data-access' | 'feature' | 'ui' | 'util';
  scope: 'shared' | string;
  platform: 'web-component' | 'any' | 'angular' | 'vue';
  directory?: string;
  prefix?: string | null;
};
