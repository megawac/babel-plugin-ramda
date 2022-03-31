"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helperModuleImports = require("@babel/helper-module-imports");

var _modules = _interopRequireDefault(require("./modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPECIAL_TYPES = ['isMemberExpression', 'isProperty'];

function isSpecialTypes(t, node) {
  return SPECIAL_TYPES.filter(function (type) {
    return t[type](node);
  }).length > 0;
}

function _default(_ref) {
  var t = _ref.types;
  // Tracking variables build during the AST pass. We instantiate
  // these in the `Program` visitor in order to support running the
  // plugin in watch mode or on multiple files.
  var ramdas, removablePaths, specified, selectedMethods; // Import a ramda method and return the computed import identifier

  function importMethod(useES, methodName, file) {
    if (!selectedMethods[methodName]) {
      var path = (0, _modules.default)(useES, methodName);
      selectedMethods[methodName] = (0, _helperModuleImports.addDefault)(file.path, path, {
        nameHint: methodName
      });
    }

    return t.clone(selectedMethods[methodName]);
  }

  function matchesRamda(path, name) {
    return ramdas[name] && (hasBindingOfType(path.scope, name, 'ImportDefaultSpecifier') || hasBindingOfType(path.scope, name, 'ImportNamespaceSpecifier'));
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
        enter: function enter() {
          // Track the variables used to import ramda
          ramdas = Object.create(null);
          removablePaths = [];
          specified = Object.create(null); // Track the methods that have already been used to prevent dupe imports

          selectedMethods = Object.create(null);
        },
        exit: function exit() {
          removablePaths.filter(function (path) {
            return !path.removed;
          }).forEach(function (path) {
            return path.remove();
          });
        }
      },
      ImportDeclaration: function ImportDeclaration(path) {
        var node = path.node;

        if (node.source.value === 'ramda') {
          node.specifiers.forEach(function (spec) {
            if (t.isImportSpecifier(spec)) {
              specified[spec.local.name] = spec.imported.name;
            } else {
              ramdas[spec.local.name] = true;
            }
          });
          path.replaceWith(t.nullLiteral());
          removablePaths.push(path);
        }
      },
      ExportNamedDeclaration: function ExportNamedDeclaration(path, state) {
        var node = path.node,
            hub = path.hub;
        var useES = state.opts.useES;

        if (node.source && node.source.value === 'ramda') {
          var specifiers = node.specifiers.map(function (spec) {
            var importIdentifier = importMethod(useES, spec.exported.name, hub.file);
            var exportIdentifier = t.identifier(spec.local.name);
            return t.exportSpecifier(importIdentifier, exportIdentifier);
          });
          node.specifiers = specifiers;
          node.source = null;
        }
      },
      ExportAllDeclaration: function ExportAllDeclaration(path) {
        var node = path.node;

        if (node.source && node.source.value === 'ramda') {
          throw new Error('`export * from "ramda"` defeats the purpose of babel-plugin-ramda');
        }
      },
      CallExpression: function CallExpression(path, state) {
        var node = path.node,
            hub = path.hub;
        var name = node.callee.name;
        var useES = state.opts.useES;
        if (!t.isIdentifier(node.callee)) return;

        if (matchesRamdaMethod(path, name)) {
          node.callee = importMethod(useES, specified[name], hub.file);
        }

        if (node.arguments) {
          node.arguments = node.arguments.map(function (arg) {
            var name = arg.name;
            return matchesRamdaMethod(path, name) ? importMethod(useES, specified[name], hub.file) : arg;
          });
        }
      },
      MemberExpression: function MemberExpression(path, state) {
        var node = path.node;
        var objectName = node.object.name;
        var useES = state.opts.useES;
        if (!matchesRamda(path, objectName)) return; // R.foo() -> foo()

        var newNode = importMethod(useES, node.property.name, path.hub.file);
        path.replaceWith({
          type: newNode.type,
          name: newNode.name
        });
      },
      Property: function Property(path, state) {
        var node = path.node,
            hub = path.hub;
        var useES = state.opts.useES;

        if (t.isIdentifier(node.key) && node.computed && matchesRamdaMethod(path, node.key.name)) {
          node.key = importMethod(useES, specified[node.key.name], hub.file);
        }

        if (t.isIdentifier(node.value) && matchesRamdaMethod(path, node.value.name)) {
          node.value = importMethod(useES, specified[node.value.name], hub.file);
        }
      },
      Identifier: function Identifier(path, state) {
        var node = path.node,
            hub = path.hub,
            parent = path.parent,
            scope = path.scope;
        var name = node.name;
        var useES = state.opts.useES;

        if (matchesRamdaMethod(path, name) && !isSpecialTypes(t, parent)) {
          var newNode = importMethod(useES, specified[name], hub.file);
          path.replaceWith({
            type: newNode.type,
            name: newNode.name
          });
        } else if (matchesRamda(path, name)) {
          // #19, nullify direct references to the ramda import (for apply/spread/etc)
          var replacementNode = t.nullLiteral();
          path.replaceWith(replacementNode);
        }
      }
    }
  };
}