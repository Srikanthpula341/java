// Proper anchor mock that returns a valid DOM node
beforeAll(() => {
    jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        const anchor = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        anchor.click = jest.fn();
        return anchor;
      }
      return document.createElement(tagName);
    });
  });
  