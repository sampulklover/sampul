function mapToSelect(list, elementId) {
  if (list.length > 0 && elementId) {
    list.forEach((items) => {
      const option = document.createElement('option');
      option.value = items.value;
      option.text = items.name;
      document.getElementById(elementId).appendChild(option);
    });
  }
}
