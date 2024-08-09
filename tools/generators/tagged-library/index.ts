import { formatFiles, installPackagesTask, Tree } from '@nx/devkit';
import { wrapAngularDevkitSchematic } from '@nx/devkit/ngcli-adapter';
import { libraryGenerator } from '@nx/workspace/generators';
import { TaggedLibrarySchemaOptions } from './schema';

function getTags(schema: TaggedLibrarySchemaOptions): string {
  return `type:${schema.type},scope:${schema.scope},platform:${schema.platform}`;
}

function getLibraryGenerator(schema: TaggedLibrarySchemaOptions) {
  switch (schema.platform) {
    case 'angular':
      return wrapAngularDevkitSchematic('@nx/angular', 'library');
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
