'use strict';

module.exports = {
  assignment: /([a-z]+)="([^"]+)"/,
  emptyLines: /^(?:\s+)?(?:#.+)?\r?\n/mg,
  string: /"([^"]+)"/,
  stringQuotes: /^"|"$/g
};
