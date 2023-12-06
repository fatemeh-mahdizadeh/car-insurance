class HTMLUI {
  displayYears() {
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ],
      fixNumbers = function (str) {
        if (typeof str === "string") {
          for (var i = 0; i < 10; i++) {
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    const now = new Date().toLocaleDateString("fa-IR");
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);

    let min = max - 20;
    const selectYears = document.querySelector(".selectTag");

    for (let i = max; i >= min; i--) {
      const option = document.createElement("option");
      option.innerText = i;
      option.value = i;
      selectYears.appendChild(option);
    }
  }

  displayError(err) {
    const div = document.createElement("div");
    div.classList = "error";
    div.innerText = err;

    form.insertBefore(div, document.querySelector("div"));
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
  }

  showResult(price, info) {
    const result = document.querySelector(".result");
    let make;
    // make
    switch (info.make) {
      case "1":
        make = "پراید";
        break;
      case "2":
        make = "اپتیما";
        break;
      case "3":
        make = "پورشه";
        break;
    }
    //level
    let level = info.level;
    if (level == "sade") {
      level = "ساده";
    } else {
      level = "کامل";
    }
    //year
    let year = info.year;

    //html
    const div = document.createElement("div");
    div.classList =
      "mx-auto w-10/12 text-center  border border-purple-400 bg-purple-300 pb-3 mt-6 rounded-xl ";
    div.innerHTML = `
        <p class="bg-purple-700 py-2 text-white rounded-t-lg ">خلاصه فاکتور</p>
        <p class="py-1 pt-2">مدل ماشین: ${make}</p>
        <p class="py-1">سال ساخت: ${year}</p>
        <p class="py-1">نوع بیمه: ${level}</p>
        <p class="py-1">قیمت نهایی: ${price}</p>
        `;
    let spinner = document.querySelector(".spinner");
    spinner.classList.remove("hidden");
    setTimeout(() => {
      spinner.classList.add("hidden");
      result.appendChild(div);
    }, 3000);
  }
}

// --------------------------------------------------------

class Insurance {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }

  calculatePrice(info) {
    let price;
    let bace = 2000000;
    const make = info.make;
    //get make and price--
    price = this.getMake(make, bace);

    //get year and price--
    const year = info.year;
    const diffrence = this.getyearDiffrence(year);
    price = price - ((diffrence * 3) / 100) * price;

    //get level and price--
    const level = info.level;
    price = info.calculatelevel(level, price);
    return price;
  }
  //---------------------- give make protype
  getMake(make, bace) {
    let price;
    switch (make) {
      case "1":
        price = bace * 1.15;
        break;
      case "2":
        price = bace * 1.3;
        break;
      case "3":
        price = bace * 1.8;
        break;
    }
    return price;
  }

  //------------- give year protype
  getyearDiffrence(year) {
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ],
      fixNumbers = function (str) {
        if (typeof str === "string") {
          for (var i = 0; i < 10; i++) {
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    const now = new Date().toLocaleDateString("fa-IR");
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);
    
    year = max - year;

    return year;
  }

  //------------------- give level protype
  calculatelevel(level, price) {
    if (level == "sade") {
      price = price * 1.3;
    } else {
      price = price * 1.5;
    }
    return price;
  }
}
