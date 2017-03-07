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
  function importMethod(methodName, file) {
    if (!selectedMethods[methodName]) {
      let path = resolveModule(methodName);
      selectedMethods[methodName] = file.addImport(path, 'default');
    }
    return t.clone(selectedMethods[methodName]);
  }

  function matchesRamda(path, name) {
    return ramdas[name] && hasBindingOfType(path.scope, name, 'ImportDefaultSpecifier');
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
      CallExpression(path) {
        let { node, hub } = path;
        let { name } = node.callee;
        let { file } = hub;
        if (!t.isIdentifier(node.callee)) return;
        if (matchesRamdaMethod(path, name)) {
          node.callee = importMethod(specified[name], file);
        }
        if (node.arguments) {
          node.arguments = node.arguments.map(arg => {
            let { name } = arg;
            return matchesRamdaMethod(path, name)
              ? importMethod(specified[name], file)
              : arg;
          });
        }
      },
      MemberExpression(path) {
        let { node } = path;
        let { file } = path.hub;
        let objectName = node.object.name;
        if (!matchesRamda(path, objectName)) return;
        // R.foo() -> foo()
        let newNode = importMethod(node.property.name, file);
        path.replaceWith({ type: newNode.type, name: newNode.name });
      },
      Property(path) {
        let { node, hub: { file } } = path;
        if (t.isIdentifier(node.key) && node.computed && matchesRamdaMethod(path, node.key.name)) {
          node.key = importMethod(specified[node.key.name], file);
        }
        if (t.isIdentifier(node.value) && matchesRamdaMethod(path, node.value.name)) {
          node.value = importMethod(specified[node.value.name], file);
        }
      },
      Identifier(path) {
        let { node, hub, parent, scope } = path;
        let { name } = node;
        let { file } = hub;
        if (matchesRamdaMethod(path, name) && !isSpecialTypes(t, parent)) {
          let newNode = importMethod(specified[name], file);
          path.replaceWith({ type: newNode.type, name: newNode.name });
        }
      }
    }
  };
}
