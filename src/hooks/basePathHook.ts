/**
 * TODO: 获取项目基础路径
 * @returns 项目基础路径
 */
export const useBasePath = (): string => {
  const basePath = (import.meta.env.VITE_APP_BASE_PATH || "/").replace(
    /\/$/,
    ""
  );

  return basePath;
};
