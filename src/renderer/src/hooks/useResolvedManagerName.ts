import { useEffect, useState } from 'react';
import { resolveManagerName, DEFAULT_MANAGER_NAME } from '@shared/managerIdentity';

const MANAGER_ID = 'manager';

/**
 * Manager's persisted display name, for the boot screens shown BEFORE the store
 * has manager's live agent object (so before `agent.name` exists anywhere to
 * read). Reads the registry directly, the same way useHive.ts's spawn effect
 * does, rather than assuming the default — otherwise a renamed manager's own
 * "clocking in" screen would flash the wrong name every launch.
 */
export function useResolvedManagerName(): string {
  const [managerName, setManagerName] = useState(DEFAULT_MANAGER_NAME);
  useEffect(() => {
    let cancelled = false;
    void window.cth.hiveRegistry().then((reg) => {
      if (!cancelled) setManagerName(resolveManagerName(reg?.agents?.[MANAGER_ID]?.name));
    }).catch(() => { /* keep the default while unknown */ });
    return () => { cancelled = true; };
  }, []);
  return managerName;
}
