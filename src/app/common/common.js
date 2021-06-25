export const createDomNode = (node, element, ...classes) => {
  node = document.createElement(element);
  node.classList.add(...classes);
  return node;
};

export const updateNode = (node, method, ...props) => {
  node.innerHTML = "";
  node.append(method(...props));
};
