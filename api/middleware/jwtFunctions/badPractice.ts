

export async function fetchRoleUsersByCACIdentifier(cacIdentifier) {
  const args = { CACIdentifier: cacIdentifier };

  try {
    const roleUsers = 'JSON object with ROLES' // This is where the JSON value with roles go
    // const parsedJSONS = transformRecordset(roleUsers);
    return roleUsers;
  } catch (error) {
    console.error('Error fetching role users:', error);
    throw error;
  }
}
