import { useEffect } from 'react';
import { useStore } from '@/store/store';
import { setManagerName } from './index';

/**
 * Keep i18n's `{{managerName}}` pointed at the orchestrator's real name.
 *
 * Mounted once, near the root. Reads the live agent (which is what a rename
 * updates) and pushes it into i18next's default variables, so every string that
 * mentions the orchestrator follows the rename immediately, in both locales,
 * without any of those call sites knowing the name.
 */
export function useManagerNameSync(): void {
  const name = useStore((s) => s.agents.find((a) => a.isManager)?.name);
  useEffect(() => { setManagerName(name); }, [name]);
}
