const getSelection = (element: HTMLElement) => {
  const range = window.getSelection()?.getRangeAt(0);
  const preSelectionRange = range?.cloneRange();
  preSelectionRange?.selectNodeContents(element);
  range && preSelectionRange?.setEnd(range?.startContainer, range?.startOffset);
  const selectionStart = preSelectionRange?.toString().length;
  const selectionEnd = selectionStart && range && selectionStart + range?.toString().length;

  return { selectionStart, selectionEnd };
};

export default getSelection;
