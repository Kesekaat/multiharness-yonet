/** Manager's identity before anyone has customized it — the app's own default,
 *  not a magic string sprinkled at every spawn call site. */
export const DEFAULT_MANAGER_NAME = 'Hakan';
const LEGACY_DEFAULT_MANAGER_NAME = 'Michael';

/**
 * Resolve manager's display name for a (re)spawn.
 *
 * `renameAgent()` (`store.ts`) persists a rename straight into `registry.json`
 * via `hive.ts`'s `renameAgent()` — but the manager-spawn effect used to rebuild
 * manager's agent object from scratch with `name: DEFAULT_MANAGER_NAME` hardcoded in
 * three places, so a custom name reverted to "Hakan" on every app restart
 * even though the registry still had it right. Reading the persisted name
 * back here (instead of hardcoding the default) is what keeps a rename from
 * reverting. Falls back to the default only when nothing has been persisted
 * yet — a fresh hive, or a registry not yet written this run.
 */
export function resolveManagerName(persistedName: string | undefined | null): string {
  const trimmed = persistedName?.trim();
  // Carry existing installations from the old built-in persona name to the new
  // one. Any other persisted value is a user rename and remains untouched.
  return !trimmed || trimmed === LEGACY_DEFAULT_MANAGER_NAME ? DEFAULT_MANAGER_NAME : trimmed;
}
