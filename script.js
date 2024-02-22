const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector("#result");
const sound = document.querySelector("#sound");
const btn = document.querySelector("#search-btn");
const inputWord = document.querySelector("#input-word");



btn.addEventListener("click", () => {
    let inputWordValue = inputWord.value;
    fetch(`${url}${inputWordValue}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data && data[0] && data[0].phonetics && data[0].phonetics.length > 0) {
                result.innerHTML = `
                <div class="word">
                    <h3>${inputWordValue}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                sound.setAttribute("src", data[0].phonetics[0].audio);
            } else {
                result.innerHTML = `<h3 class=error"">Bhai mujhe toh nhi aata tujhe pata hai toh bata de...</h3>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

inputWord.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        btn.click();
    }
});

function playSound() {
    sound.play();
}
