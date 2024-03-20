const myCheckbox = document.getElementById("myCheckbox");

myCheckbox.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked
    console.log("Checkbox is checked!");
    // Add any other logic you need here
  } else {
    // Checkbox is unchecked
    console.log("Checkbox is unchecked!");
    // Add any other logic you need here
  }
});
