import { addDefault } from '@babel/helper-module-imports';
import resolveModule from './modules';

const SPECIAL_TYPES = ['isMemberExpression', 'isProperty'];

function isSpecialTypes(t, node) {
    return SPECIAL_TYPES.filter(type => t[type](node)).length > 0;
}

export default function({ types: t }) {
  // Tracking variables build during the AST pass. We instantiate
  // these in the `Program` visitor in order to support running the
  // plugin in watch mode or on multiple files.
  let ramdas,
      specified,
      selectedMethods;

  // Import a ramda method and return the computed import identifier
  function importMethod(useES, methodName, file) {
    if (!selectedMethods[methodName]) {
      let path = resolveModule(useES, methodName);
      selectedMethods[methodName] = addDefault(file.path, path, { nameHint: methodName });
    }
    return t.clone(selectedMethods[methodName]);
  }

  function matchesRamda(path, name) {
    return ramdas[name] && (
      hasBindingOfType(path.scope, name, 'ImportDefaultSpecifier') ||
      hasBindingOfType(path.scope, name, 'ImportNamespaceSpecifier')
    );
  }

  function matchesRamdaMethod(path, name) {
    return specified[name] && hasBindingOfType(path.scope, name, 'ImportSpecifier');
  }

  function hasBindingOfType(scope, name, type) {
    return scope.hasBinding(name) && scope.getBinding(name).path.type === type;
  }

  return {
    visitor: {
      Program: {
        enter() {
          // Track the variables used to import ramda
          ramdas = Object.create(null);
          specified = Object.create(null);
          // Track the methods that have already been used to prevent dupe imports
          selectedMethods = Object.create(null);
        }
      },
      ImportDeclaration(path) {
        let { node } = path;
        if (node.source.value === 'ramda') {
          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {
              specified[spec.local.name] = spec.imported.name;
            } else {
              ramdas[spec.local.name] = true;
            }
          });
          path.remove();
        }
      },
      ExportNamedDeclaration(path, state) {
        let { node, hub } = path;
        let { useES } = state.opts;
        if (node.source && node.source.value === 'ramda') {
          let specifiers = node.specifiers.map(spec => {
            let importIdentifier = importMethod(useES, spec.exported.name, hub.file);
            let exportIdentifier = t.identifier(spec.local.name);
            return t.exportSpecifier(importIdentifier, exportIdentifier);
          });
          node.specifiers = specifiers;
          node.source = null;
        }
      },
      ExportAllDeclaration(path) {
        let { node } = path;
        if (node.source && node.source.value === 'ramda') {
          throw new Error('`export * from "ramda"` defeats the purpose of babel-plugin-ramda');
        }
      },
      CallExpression(path, state) {
        let { node, hub } = path;
        let { name } = node.callee;
        let { useES } = state.opts;
        if (!t.isIdentifier(node.callee)) return;
        if (matchesRamdaMethod(path, name)) {
          node.callee = importMethod(useES, specified[name], hub.file);
        }
        if (node.arguments) {
          node.arguments = node.arguments.map(arg => {
            let { name } = arg;
            return matchesRamdaMethod(path, name)
              ? importMethod(useES, specified[name], hub.file)
              : arg;
          });
        }
      },
      MemberExpression(path, state) {
        let { node } = path;
        let objectName = node.object.name;
        let { useES } = state.opts;
        if (!matchesRamda(path, objectName)) return;
        // R.foo() -> foo()
        let newNode = importMethod(useES, node.property.name, path.hub.file);
        path.replaceWith({ type: newNode.type, name: newNode.name });
      },
      Property(path,state) {
        let { node, hub } = path;
        let { useES } = state.opts;
        if (t.isIdentifier(node.key) && node.computed && matchesRamdaMethod(path, node.key.name)) {
          node.key = importMethod(useES, specified[node.key.name], hub.file);
        }
        if (t.isIdentifier(node.value) && matchesRamdaMethod(path, node.value.name)) {
          node.value = importMethod(useES, specified[node.value.name], hub.file);
        }
      },
      Identifier(path, state) {
        let { node, hub, parent, scope } = path;

        let { name } = node;
        let { useES } = state.opts;
        if (matchesRamdaMethod(path, name) && !isSpecialTypes(t, parent)) {
          let newNode = importMethod(useES, specified[name], hub.file);
          path.replaceWith({ type: newNode.type, name: newNode.name });
        } else if (matchesRamda(path, name)) {
          // #19, nullify direct references to the ramda import (for apply/spread/etc)
          let replacementNode = t.nullLiteral();
          path.replaceWith(replacementNode);
        }
      }
    }
  };
}
