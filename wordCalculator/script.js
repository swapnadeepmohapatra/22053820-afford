function WordCalculator() {
  this.text = "";
  this.characters = 0;
  this.words = 0;
  this.sentences = 0;

  document
    .querySelector("textarea")
    .addEventListener("change", this.onChangeHandler.bind(this));

  document
    .querySelector("#calculate")
    .addEventListener("click", this.clickHandler.bind(this));

  document
    .querySelector("#clear")
    .addEventListener("click", this.clearText.bind(this));
}

WordCalculator.prototype.onChangeHandler = function (event) {
  this.text = event.target.value;

  console.log(this.text);
};

WordCalculator.prototype.countWords = function (event) {
  this.words = this.text.trim().split(" ").length;
  document.querySelector(".words").innerHTML = this.words;
  //   this.words = this.text.trim().split("\n").map((sentence) => sentence.split(" ").length).reduce((acc, cur) => acc + cur, 0);
};

WordCalculator.prototype.countCharacters = function (event) {
  this.characters = this.text.trim().split("").length;
  document.querySelector(".characters").innerHTML = this.characters;
};

WordCalculator.prototype.countSentences = function (event) {
  this.sentences = this.text.trim().split("\n").length;
  document.querySelector(".sentences").innerHTML = this.sentences;
};

WordCalculator.prototype.clickHandler = function (event) {
  this.countCharacters();
  this.countSentences();
  this.countWords();
};

WordCalculator.prototype.clearText = function (event) {
  document.querySelector("textarea").value = "";
};

const wordCalculator = new WordCalculator();
