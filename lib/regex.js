'use strict';

module.exports = {
  assignment: /([a-z]+)="([^"]+)"/,
  command: /^([a-zA-Z]+)(?:\s+(.+))?/,
  emptyLines: /^(?:\s+)?(?:#.+)?/,
  number: /[0-9]+/,
  string: /"([^"]+)"/,
  stringQuotes: /^"|"$/g
};
