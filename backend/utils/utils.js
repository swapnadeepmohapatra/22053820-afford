export const transformUserData = (userData) => {
  const transformedData = Object.entries(userData).map(([key, value]) => ({
    id: key,
    name: value,
  }));

  return transformedData;
};
