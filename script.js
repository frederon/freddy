const submitButton = $('input[type="submit"]');
const formElement = $('form');

let indexResult = 1;

submitButton.on('click', e => {
  e.preventDefault();
  if (formElement.hasClass("form__dagingayam")) {
    let score = hitungSkorFreshness(['kelainan', 'ketebalan', 'lemak', 'utuh', 'memar', 'bersih'], 100);
    tambahHasilFreshness(score)
  } else if (formElement.hasClass("form__dagingsapi")) {
    let score = hitungSkorFreshness(['tebal_lemak', 'bentuk', 'warna', 'warna_lemak', 'perubahan_warna', 'tekstur'], 100);
    tambahHasilFreshness(score)
  } else if (formElement.hasClass("form__dagingikan")) {
    let score = hitungSkorIkan(['bolamata', 'korpup', 'mata', 'warna', 'lendir', 'warna-lendir', 'tekstur', 'kilapan', 'sayatan', 'jaringan', 'bau', 'kepadatan', 'elastisitas']);
    tambahHasilFreshness(score / 54 * 100)
  } else if (formElement.hasClass("form__sayur")) {
    let score = hitungSkorFreshness(['amis', 'lendir', 'gelap', 'lembek', 'pucuk'], 100)
    tambahHasilFreshness(score)
  } else if (formElement.hasClass("form__ayamtiren")) {
    let res = hitungKeamanan(['daging-kuning', 'daging-gelap', 'bercak', 'kebiruan', 'lembek', 'organ-gelap', 'amis', 'nadi'])
    tambahHasilKeamanan(res);
  } else if (formElement.hasClass("form__gelonggongan")) {
    let res = hitungKeamanan(['kepucatan', 'tekstur', 'berair', 'harga'])
    tambahHasilKeamanan(res);
  }
  indexResult += 1;
})

function hitungSkorFreshness(arrayNama, max) {
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

function tambahHasilFreshness(score) {
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

function hitungKeamanan(arrayNama) {
  arrayNama = arrayNama.filter(el => $(`input[name=${el}]:checked`).val() && $(`input[name=${el}]:checked`).val() !== "lewati")
  if (arrayNama.every(val => $(`input[name=${val}]:checked`).val() === "ya")) {
    return 0;
  } else if (arrayNama.every(val => $(`input[name=${val}]:checked`).val() === "tidak")) {
    return 2;
  }
  return 1;
}

function tambahHasilKeamanan(res) {
  $('.container').append(`
    <div class="soalcek result" id="result${indexResult}">
      <h1>Hasil :</h1>
      <span>Dihitung pada ${new Date()}</span>
      <h2 class="${res === 0 ? 'red' : res === 2 ? 'green' : ''}">
        ${$('form').attr('class').includes('tiren') ? 
          res === 0 ? 'Ayam tiren' : res === 2 ? 'Bukan ayam tiren' : 'Mungkin ayam tiren'
        :
          res === 0 ? 'Gelonggongan' : res === 2 ? 'Bukan gelonggongan' : 'Mungkin gelonggongan'
        }
      </h2>
    </div>
  `)
  $('html, body').animate({
    scrollTop: $(`#result${indexResult}`).offset().top
  }, 100);
}

function hitungSkorIkan(arrayNama) {
  let score = 0;
  arrayNama = arrayNama.filter(el => $(`input[name=${el}]:checked`).val() && $(`input[name=${el}]:checked`).val() !== "lewati");
  arrayNama.forEach(element => {
    const val = Number($(`input[name=${element}]:checked`).val());
    score += val;
  });
  return score;
}
