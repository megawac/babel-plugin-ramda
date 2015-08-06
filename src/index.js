import resolveModule from './modules';

export default function({ Plugin, types: t }) {
  // Track the variables used to import ramda
  let ramdas = Object.create(null);
  let specified = Object.create(null);

  // Track the methods that have already been used to prevent dupe imports
  let selectedMethods = Object.create(null);

  // Import a ramda method and return the computed import identifier
  function importMethod(methodName, file) {
    if (!selectedMethods[methodName]) {
      let path = resolveModule(methodName);
      selectedMethods[methodName] = file.addImport(path, methodName);
    }
    return selectedMethods[methodName];
  }

  return new Plugin("ramda", {

    visitor: {
      ImportDeclaration(node, parent, scope) {
        if (node.source.value === 'ramda') {
          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {
              specified[spec.local.name] = spec.imported.name;
            } else {
              ramdas[spec.local.name] = true;
            }
          });
          this.dangerouslyRemove();
        }
      },

      CallExpression(node, parent, scope, file) {
        let {name} = node.callee;
        if (!t.isIdentifier(node.callee)) return;
        if (specified[name]) {
          node.callee = importMethod(specified[name], file);
          return node;
        }
      },

      MemberExpression(node, parent, scope, file) {
        if (!ramdas[node.object.name]) return;

        // R.foo() -> foo()
        return importMethod(node.property.name, file);
      },

      exit(node) {
        if (!t.isProgram(node)) return;
        // Clean up tracking variables
        ramdas = Object.create(null);
        specified = Object.create(null);
        selectedMethods = Object.create(null);
      }
    }

  });
}
