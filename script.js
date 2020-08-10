const submitButton = $('input[type="submit"]');
const formElement = $('form');

let indexResult = 1;

submitButton.on('click', e => {
  e.preventDefault();
  if (formElement.hasClass("form__dagingayam")) {
    let score = hitungSkor(['kelainan', 'ketebalan', 'lemak', 'utuh', 'memar', 'bersih'], 100);
    addNewHistory(score)
  } else if (formElement.hasClass("form__dagingsapi")) {
    let score = hitungSkor(['tebal_lemak', 'bentuk', 'warna', 'warna_lemak', 'perubahan_warna', 'tekstur'], 100);
    addNewHistory(score)
  } else if (formElement.hasClass("form__sayur")) {
    let score = hitungSkor(['amis', 'lendir', 'gelap', 'lembek', 'pucuk'], 100)
    addNewHistory(score)
  }
  indexResult += 1;
})

function hitungSkor(arrayNama, max) {
  let score = 0;
  let count = arrayNama.filter(el => $(`input[name=${el}]:checked`).val() && $(`input[name=${el}]:checked`).val() !== "lewati").length;
  arrayNama.forEach(element => {
    const val = $(`input[name=${element}]:checked`).val();
    if (val === "baik") {
      score += (max / count);
    } else if (val === "sedang") {
      score += (max / count) * 2 / 3;
    } else if (val === "tidak baik") {
      score += (max / count) / 3;
    }
  });
  return score;
}

function addNewHistory(score) {
  $('.container').append(`
    <div class="soalcek result" id="result${indexResult}">
      <h1>Hasil :</h1>
      <span>Dihitung pada ${new Date()}</span>
      <h2 class="${score <= 67 ? 'red' : 'green'}">
        ${$('form').attr('class').includes('daging') ? 'Daging' : 'Sayur'} Anda ${Math.round(score)}% segar
      </h2>
    </div>
  `)
  $('html, body').animate({
    scrollTop: $(`#result${indexResult}`).offset().top
  }, 100);
}
