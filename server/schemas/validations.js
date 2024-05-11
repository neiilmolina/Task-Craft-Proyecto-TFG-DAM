export function isUUID(uuid) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$|^[0-9a-fA-F]{32}$/;

  return uuidRegex.test(uuid);
}
