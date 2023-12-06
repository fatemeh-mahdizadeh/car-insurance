
const form = document.querySelector("form");
const html = new HTMLUI();

function addeventlisener() {
  document.addEventListener("DOMContentLoaded", function () {
    html.displayYears();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const make = document.querySelector(".make").value;
    const year = document.querySelector(".selectTag").value;
    const level = document.querySelector('.level').value;
    console.log(level);

    if (level === null || year === "" || make === "") {
      html.displayError("لطفا همه مقادیر به درستی وارد کنید");
    } else {
      let resultDiv = document.querySelector(".result div");
      if (resultDiv !== null) {
        resultDiv.remove();
      }
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculatePrice(insurance);

      html.showResult(price, insurance);
    }
  });
}

addeventlisener();



