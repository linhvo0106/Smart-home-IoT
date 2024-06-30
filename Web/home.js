var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
console.log(slider.value)
slider.oninput = function() {
    console.log(this.value)
    output.innerHTML = slider.value;
}