/**
 * TODO: 根据 class 删除Dom元素
 * @param elements 元素class
 */
const removeElementsByClass = (className: string): void => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode?.removeChild(elements[0]);
  }
};

/**
 * TODO: 根据 id 删除Dom元素
 * @param id 元素id
 */
const removeElementById = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.parentNode?.removeChild(element);
  }
};

export default {
  removeElementsByClass,
  removeElementById,
};
