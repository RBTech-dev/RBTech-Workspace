import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { TaggedLibrarySchemaOptions } from './schema';

function getTags(schema: TaggedLibrarySchemaOptions): string {
  return `type:${schema.type},scope:${schema.scope},platform:${schema.platform}`;
}

function getLibraryGenerator(schema: TaggedLibrarySchemaOptions) {
  switch (schema.platform) {
    case 'angular':
      return wrapAngularDevkitSchematic('@nrwl/angular', 'library');
  }

  return libraryGenerator;
}

export default async function (host: Tree, schema: TaggedLibrarySchemaOptions) {
  const libGenerator = getLibraryGenerator(schema);
  const tags = getTags(schema);

  await libGenerator(host, {
    name: schema.name,
    directory: schema.directory,
    prefix: schema.prefix,
    tags,
  });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
