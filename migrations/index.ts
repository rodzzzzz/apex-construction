import * as migration_20260901_060244_initial from "./20260901_060244_initial";

export const migrations = [
  {
    up: migration_20260901_060244_initial.up,
    down: migration_20260901_060244_initial.down,
    name: "20260901_060244_initial",
  },
];
