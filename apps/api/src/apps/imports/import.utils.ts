function isUtf8Text(bytes: Uint8Array): boolean {
  if (bytes.length === 0 || bytes.includes(0)) {
    return false;
  }

  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}

export function detectCsvContentType(bytes: Buffer): 'text/csv' | undefined {
  return isUtf8Text(bytes) ? 'text/csv' : undefined;
}
