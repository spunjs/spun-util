'use strict';

module.exports = {
  assignment: /([a-z]+)="([^"]+)"/,
  command: /^([a-zA-Z]+)(?:\s+(.+))?/,
  emptyLines: /^(?:\s+)?(?:#.+)?\r?\n/mg,
  string: /"([^"]+)"/,
  stringQuotes: /^"|"$/g
};
