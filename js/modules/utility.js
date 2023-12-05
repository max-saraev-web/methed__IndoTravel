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

export const styles = new Map();

export const loadStyles = url => {
  if (styles.has(url)) {
    return styles.get(url);
  }

  const stylePromise = new Promise(resolve => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = url;
    style.addEventListener('load', () => {
      resolve();
    });

    document.head.prepend(style);
  });

  styles.set(url, stylePromise);

  return stylePromise;
};
