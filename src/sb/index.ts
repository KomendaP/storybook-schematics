import { strings } from "@angular-devkit/core";
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  template,
  url,
  SchematicsException,
  move,
} from "@angular-devkit/schematics";
import { parseName } from "@schematics/angular/utility/parse-name";
import { buildDefaultPath } from "@schematics/angular/utility/workspace";
import { Schema } from "./schemas/schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function sb(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read("angular.json");

    if (!workspaceConfigBuffer) {
      throw new SchematicsException("Not an Angular CLI workspace!");
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.projects[projectName];

    const defaultProjectPath = buildDefaultPath(project);

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url("./files");

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({ ..._options, ...strings, name }),
      move(path),
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}
