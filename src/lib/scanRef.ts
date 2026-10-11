const STORAGE_KEY = "attestation_scan_ref";

export function saveScanRef(ref: string | undefined | null) {
  if (typeof window === "undefined") return;
  const value = ref?.trim();
  if (!value) return;
  sessionStorage.setItem(STORAGE_KEY, value);
}

export function readScanRef(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = sessionStorage.getItem(STORAGE_KEY)?.trim();
  return value || undefined;
}

export function resolveScanRef(fromSearch?: string | undefined | null): string | undefined {
  const fromUrl = fromSearch?.trim();
  if (fromUrl) {
    saveScanRef(fromUrl);
    return fromUrl;
  }
  return readScanRef();
}
