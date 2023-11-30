export const getDb = async () => {
  const result = await fetch('db.json');
  const data = await result.json();
  return data;
};

export const createDefaultOption = str => {
  const elem = document.createElement('option');
  elem.classList.add('tour__option');
  elem.textContent = str;
  return elem;
};
