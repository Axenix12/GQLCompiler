

export async function fetchRoleUsersByCACIdentifier() {
  

  try {
    const roleUsers = {
      id: '1',
      firstName: 'J.K.',
      lastName: 'Rowling',
      books: ['1', '2', '3'],
      SignedIn: 'True'
    } // This is where the JSON value with roles go
    // const parsedJSONS = transformRecordset(roleUsers);
    return roleUsers;
  } catch (error) {
    console.error('Error fetching role users:', error);
    throw error;
  }
}
