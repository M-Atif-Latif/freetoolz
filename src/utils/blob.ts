export const createBlobFromBytes = (
  bytes: Uint8Array,
  type = 'application/octet-stream'
): Blob => {
  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new Blob([arrayBuffer], { type });
};