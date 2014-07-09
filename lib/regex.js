'use strict';

module.exports = {
  command: /^([a-zA-Z]+)(?:\s+(.+))?/,
  emptyLines: /^(?:\s+)?(?:#.+)?/,
  number: /[0-9]+/,
  string: /"([^"]+)"/,
  stringQuotes: /^"|"$/g,
  variableName: /^[a-z](?:[a-zA-Z0-9_]+)?$/
};
