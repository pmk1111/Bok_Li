const bodyTag = document.body;
const bodyClassList = bodyTag.classList;

const languageSelect = document.querySelector(".set_lang");
const userLang = navigator.language.toLowerCase();
const langSplit = userLang.substring(userLang.indexOf("-") + 1);
const lang = getSupportedLanguage(langSplit);
let selectedLanguage = lang;
document.addEventListener("DOMContentLoaded", function () {
  Array.from(languageSelect.options).forEach((option) => {
    if (option.selected) {
      selectedLanguage = option.value;
    }
  });
});

const body = document.querySelector("body");
const nav = document.querySelector("nav");

// const bodyClassList = bodyTag.classList;
const logo = document.querySelector(".logo");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const menuBtn = document.querySelector(".menu_btn");
const menu = document.querySelector(".menu");

const setLang = document.querySelector(".set_lang");

const totalProfit = document.querySelector(".total_profit p");
const totalProfitPercent = document.querySelector(".total_profit_percentage p");

const calArea = document.querySelector(".cal_area");

const inputs = document.getElementsByTagName("input");
const calBtn = document.querySelector(".do_cal_btn");

const htu = document.querySelector(".how_to_use");
const htuH3 = document.querySelector(".htu_h3");

const navBar = document.querySelector(".nav_bar");
const main = document.querySelector("main");
const calAreaWrap = document.querySelector(".cal_area");

const footer = document.querySelector("footer");

function goMainPage() {
  window.location.href = "https://bokkli.netlify.app/";
}

var isActive = true;
// 다크모드
toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    const table = document.querySelector("table");
    const tr = table.querySelectorAll(".profit_detail_table tr");
    isActive = $toggle.classList.contains("active");

    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "images/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      menuBtn.classList.remove("menu_btn_dark");
      menu.classList.remove("menu_dark");

      setLang.classList.remove("set_lang_dark");
      
      for(item of tr){
        item.classList.remove("tr_dark");
      }

      calArea.classList.remove("cal_area_dark");
      for(item of inputs){
        item.classList.remove("input_dark");
      }
      calBtn.classList.remove("cal_btn_dark");

      htu.classList.remove("htu_dark");
      htuH3.classList.remove("htu_h3_dark");

      footer.classList.remove("footer_dark");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "images/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.add("nav_dark");
      menuBtn.classList.add("menu_btn_dark");
      menu.classList.add("menu_dark");
      
      setLang.classList.add("set_lang_dark");

      for(item of tr){
        item.classList.add("tr_dark");
      }

      calArea.classList.add("cal_area_dark");
      for(item of inputs){
        item.classList.add("input_dark");
      }
      calBtn.classList.add("cal_btn_dark");

      htu.classList.add("htu_dark");
      htuH3.classList.add("htu_h3_dark");

      footer.classList.add("footer_dark");
    }
  };
});







function validateNumberInput(inputElement) {
  // 현재 입력된 값 가져오기
  let inputValue = inputElement.value;

  // 숫자가 아닌 문자 제거
  inputValue = inputValue.replace(/[^0-9]/g, "");

  // 제거된 값을 다시 입력 필드에 설정
  inputElement.value = inputValue;
}

document.addEventListener("keyup", function (event) {
  // 엔터 키의 keyCode는 13입니다.
  if (event.keyCode === 13) {
    calculate();
  }
});

function calculate() {
  let amount_val = document.querySelector(".amount_input").value;
  let duration_val = document.querySelector(".duration_input").value;
  let profit_val = document.querySelector(".profit_input").value;

  // 모든 입력 필드에 값이 있을 때만 doCal() 함수 호출
  if (amount_val !== "" && duration_val !== "" && profit_val !== "") {
    doCal();
  }
}

function doCal() {
  const calArea = document.querySelector(".cal_area_wrap");
  const calBtnWrap = document.querySelector(".cal_btn_wrap");

  const csvBtnWrap = document.createElement("div");
  csvBtnWrap.classList.add("inner_container_wrap", "csv_btn_wrap");

  const existCsvBtn = document.querySelector(".csv_btn");

  if(existCsvBtn){
    existCsvBtn.remove();
  }
  const csvBtn = document.createElement("button");
  csvBtn.classList.add("csv_btn");
  csvBtn.type = "button";
  csvBtn.addEventListener("click", function () {
    downloadCSV();
  });

  csvBtn.classList.add("csv_btn");
  // 언어에 따라 csv 버튼의 텍스트 설정

  switch (selectedLanguage) {
    case "ko":
    case "kr":
      csvBtn.textContent = "CSV 다운로드";
      break;
    case "en":
      csvBtn.textContent = "Download CSV";
      break;
    case "zh":
      csvBtn.textContent = "下载CSV";
      break;
    case "ja":
      csvBtn.textContent = "CSV ダウンロード";
      break;
    default:
      csvBtn.textContent = "Download CSV";
  }

  csvBtnWrap.appendChild(csvBtn);
  calArea.insertBefore(csvBtnWrap, calBtnWrap.nextSibling);

  csvBtnWrap.append(csvBtn);
  calArea.insertBefore(csvBtnWrap, calBtnWrap.nextSibling);

  const totalResultArea = document.querySelector(".total_result_container");
  // 입력값 가져오기
  const amount = parseFloat(document.querySelector(".amount_input").value);
  const duration = parseInt(
    document.querySelector(".duration_input").value,
    10
  );
  const profit = parseFloat(document.querySelector(".profit_input").value);

  // 결과를 출력할 테이블 가져오기
  const profitTable = document.querySelector(".profit_detail_table");
  profitTable.innerHTML = "";

  // 첫 번째 행 생성
  const firstTr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");

  th1.classList.add("duration");
  th2.classList.add("profit");
  th3.classList.add("total");
  th4.classList.add("profit_percent");

  switch (selectedLanguage) {
    case "ko":
    case "kr":
      th1.innerText = "기간";
      th2.innerText = "수익";
      th3.innerText = "총액";
      th4.innerText = "수익률";
      break;
    case "en":
      th1.innerText = "Period";
      th2.innerText = "Revenue";
      th3.innerText = "Total";
      th4.innerText = "Return";
      break;
    case "zh":
      th1.innerText = "期间";
      th2.innerText = "收益";
      th3.innerText = "总额";
      th4.innerText = "收益率";
      break;
    case "ja":
      th1.innerText = "期間";
      th2.innerText = "収益";
      th3.innerText = "総額";
      th4.innerText = "収益率";
      break;
    default:
      th1.innerText = "Period";
      th2.innerText = "Revenue";
      th3.innerText = "Total";
      th4.innerText = "Return";
  }


  firstTr.append(th1);
  firstTr.append(th2);
  firstTr.append(th3);
  firstTr.append(th4);

  profitTable.append(firstTr);

  // 초기값 설정
  let newAmount = amount;

  // 반복문으로 계산하고 결과를 출력할 행 생성
  for (let i = 1; i <= duration; i++) {
    // 수익 계산
    const earnedProfit = newAmount * (profit / 100);
    // 누적 수익 계산
    const cumulativeProfit = newAmount + earnedProfit;
    // 총 수익률 계산
    const totalProfitPercentage = ((cumulativeProfit - amount) / amount) * 100;

    // 행과 셀 생성
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    // 값 설정
    td1.textContent = i + "";
    td2.textContent =
      "+" + earnedProfit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    td3.textContent = cumulativeProfit
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    td4.textContent =
      totalProfitPercentage.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "%";

    td2.classList.add("color_green");
    // 행에 셀 추가
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    // 행을 테이블에 추가
    profitTable.append(tr);

    // 다음 루프를 위해 초기값 업데이트
    newAmount = cumulativeProfit;
    if (i == duration) {
      totalProfit.textContent =
        (cumulativeProfit - amount)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "";
      totalProfitPercent.textContent =
        totalProfitPercentage.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "%";
    }

    totalResultArea.style.display = "flex";
    totalResultArea.style.justifyContent = "center";
  }

  let rows = profitTable.querySelectorAll("tr");

}

function downloadCSV() {
  // 테이블 요소 선택
  const table = document.querySelector(".profit_detail_table");

  // CSV 문자열 초기화
  let csv = "";

  // 테이블 행 순회
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];

    // 테이블 열 순회
    for (let j = 0; j < row.cells.length; j++) {
      const cellText = row.cells[j].textContent;

      // 콤마가 있으면 더블 쿼트로 감싸기
      const cellValue = cellText.includes(",") ? `"${cellText}"` : cellText;

      csv += cellValue + ",";
    }

    csv += "\n";
  }

  // CSV 파일 다운로드
  downloadFile(csv, "table_data.csv");
}

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

const langSelector = document.querySelector(".set_lang");
if (langSplit == "ko" || langSplit == "kr") {
  languageSelect.selectedIndex = "0";
} else if (langSplit == "en") {
  languageSelect.selectedIndex = "1";
} else if (langSplit == "zh") {
  languageSelect.selectedIndex = "2";
} else if (langSplit == "ja") {
  languageSelect.selectedIndex = "3";
} else {
  languageSelect.selectedIndex = "1";
}

// 언어 설정 시 콘텐츠 언어 변경
languageSelect.addEventListener("change", function () {
  const selectedLang = languageSelect.value;
  selectedLanguage = selectedLang;

  document.title = getTranslatedTitle(selectedLang);
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", getTranslatedDescription(selectedLang));
  document.querySelector(".title").innerText = getTranslatedTitle(selectedLang);
  updateContentByLanguage(selectedLang);
});

document.addEventListener("DOMContentLoaded", () => {
  // 언어에 따라 title과 콘텐츠 변경
  document.title = getTranslatedTitle(selectedLanguage);
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", getTranslatedDescription(selectedLanguage));
  document.querySelector(".title").innerText =
    getTranslatedTitle(selectedLanguage);
  updateContentByLanguage(selectedLanguage);
});

// 지원하는 언어 확인 및 기본값 설정
function getSupportedLanguage(lang) {
  const supportedLanguages = ["ko", "en", "zh", "ja"];
  return supportedLanguages.includes(lang) ? lang : "en";
}

// 언어에 따른 title 반환
function getTranslatedTitle(lang) {
  switch (lang) {
    case "ko":
    case "kr":
      return "간편 복리계산기";
    case "en":
      return "Compound Interest Calculator";
    case "zh":
      return "简易复利计算器";
    case "ja":
      return "簡単な複利計算機";
    default:
      return "Compound Interest Calculator";
  }
}

// 언어에 따른 description 반환
function getTranslatedDescription(lang) {
  switch (lang) {
    case "ko":
    case "kr":
      return "간편 복리 계산기: 계산 결과를 csv로 다운로드하세요.";
    case "en":
      return "Simple Compound Interest Calculator: Download calculation results as a CSV.";
    case "zh":
      return "简易复利计算器：将计算结果下载为CSV。";
    case "ja":
      return "簡単な複利計算機：計算結果をCSVでダウンロードします。";
    default:
      return "Simple Compound Interest Calculator: Download calculation results as a CSV.";
  }
}

// 언어에 따라 본문 내용 변경
function updateContentByLanguage(lang) {
  // 사용자 언어에 따라 다른 텍스트로 변경
  switch (lang) {
    case "ko":
    case "kr":
      document.getElementById("calculation_title").innerText = "복리 계산하기";
      document.getElementById("start_amount_label").innerText = "시작 금액";
      document.getElementById("duration_label").innerText = "기간";
      document.getElementById("profit_rate_label").innerText = "수익률 (%)";
      document.getElementById("cal_btn").innerText = "계산하기";
      document.getElementById("total_profit_title").innerText = "총 수익";
      document.getElementById("total_profit_percentage_title").innerText =
        "총 수익률";
      document
        .querySelector(".amount_input")
        .setAttribute("placeholder", "금액을 입력하세요.");
      document
        .querySelector(".duration_input")
        .setAttribute("placeholder", "기간을 입력하세요.");
      document
        .querySelector(".profit_input")
        .setAttribute("placeholder", "수익률을 입력하세요.");

      try {
        document.querySelector(".csv_btn").innerText = "CSV 다운로드";
        document.querySelector(".duration").innerText = "기간";
        document.querySelector(".profit").innerText = "수익";
        document.querySelector(".total").innerText = "총액";
        document.querySelector(".profit_percent").innerText = "수익률";
      } catch (error) {}
      break;
    case "en":
      document.getElementById("calculation_title").innerText =
        "Calculate Compound Interest";
      document.getElementById("start_amount_label").innerText =
        "Starting Amount";
      document.getElementById("duration_label").innerText = "Duration";
      document.getElementById("profit_rate_label").innerText =
        "Profit Rate (%)";
      document.getElementById("cal_btn").innerText = "Calculate";
      document.getElementById("total_profit_title").innerText = "Total Profit";
      document.getElementById("total_profit_percentage_title").innerText =
        "Total Profit Percentage";
      document
        .querySelector(".amount_input")
        .setAttribute("placeholder", "Set the amount.");
      document
        .querySelector(".duration_input")
        .setAttribute("placeholder", "Set a period");
      document
        .querySelector(".profit_input")
        .setAttribute("placeholder", "Set your rate of return.");

      try {
        document.querySelector(".csv_btn").innerText = "Download CSV";
        document.querySelector(".duration").innerText = "Period";
        document.querySelector(".profit").innerText = "Revenue";
        document.querySelector(".total").innerText = "Total";
        document.querySelector(".profit_percent").innerText = "Return";
      } catch (error) {}
      break;
    case "zh":
      document.getElementById("calculation_title").innerText = "复利计算";
      document.getElementById("start_amount_label").innerText = "开始金额";
      document.getElementById("duration_label").innerText = "期限";
      document.getElementById("profit_rate_label").innerText = "收益率 (%)";
      document.getElementById("cal_btn").innerText = "计算";
      document.getElementById("total_profit_title").innerText = "总利润";
      document.getElementById("total_profit_percentage_title").innerText =
        "总利润百分比";
      document
        .querySelector(".amount_input")
        .setAttribute("placeholder", "请输入金额");
      document
        .querySelector(".duration_input")
        .setAttribute("placeholder", "设定持续时间");
      document
        .querySelector(".profit_input")
        .setAttribute("placeholder", "输入您的回报率");

      try {
        document.querySelector(".csv_btn").innerText = "下载CSV";
        document.querySelector(".duration").innerText = "期间";
        document.querySelector(".profit").innerText = "收益";
        document.querySelector(".total").innerText = "总额";
        document.querySelector(".profit_percent").innerText = "收益率";
      } catch (error) {}
      break;
    case "ja":
      document.getElementById("calculation_title").innerText = "複利計算機";
      document.getElementById("start_amount_label").innerText = "初期金額";
      document.getElementById("duration_label").innerText = "期間";
      document.getElementById("profit_rate_label").innerText = "利益率 (%)";
      document.getElementById("cal_btn").innerText = "計算する";
      document.getElementById("total_profit_title").innerText = "合計利益";
      document.getElementById("total_profit_percentage_title").innerText =
        "合計利益率";
      document
        .querySelector(".amount_input")
        .setAttribute("placeholder", "金額を入力してください.");
      document
        .querySelector(".duration_input")
        .setAttribute("placeholder", "期間を入力してください.");
      document
        .querySelector(".profit_input")
        .setAttribute("placeholder", "収益率を入力してください.");

      try {
        document.querySelector(".csv_btn").innerText = "CSV ダウンロード";
        document.querySelector(".duration").innerText = "期間";
        document.querySelector(".profit").innerText = "収益";
        document.querySelector(".total").innerText = "総額";
        document.querySelector(".profit_percent").innerText = "収益率";
      } catch (error) {}
      break;
    default:
      // 기본값은 영어로 설정
      document.getElementById("calculation_title").innerText =
        "Calculate Compound Interest";
      document.getElementById("start_amount_label").innerText =
        "Starting Amount";
      document.getElementById("duration_label").innerText = "Duration";
      document.getElementById("profit_rate_label").innerText =
        "Profit Rate (%)";
      document.getElementById("cal_btn").innerText = "Calculate";
      document.getElementById("total_profit_title").innerText = "Total Profit";
      document.getElementById("total_profit_percentage_title").innerText =
        "Total Profit Percentage";
      document
        .querySelector(".amount_input")
        .setAttribute("placeholder", "Set the amount.");
      document
        .querySelector(".duration_input")
        .setAttribute("placeholder", "Set a period");
      document
        .querySelector(".profit_input")
        .setAttribute("placeholder", "Set your rate of return.");

      try {
        document.querySelector(".csv_btn").innerText = "Download CSV";
        document.querySelector(".duration").innerText = "Period";
        document.querySelector(".profit").innerText = "Revenue";
        document.querySelector(".total").innerText = "Total";
        document.querySelector(".profit_percent").innerText = "Return";
      } catch (error) {}
  }
}




// common js
var isMenuOpened = false;
var isContentOpened = false;
var browserWidth = window.innerWidth;
let contentType = document.querySelectorAll(".content_type");

document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".menu_btn");

  menuBtn.addEventListener("click", function () {
    let menu = document.querySelector(".menu");
    slideToggle(menu);
  });

  contentType.forEach(function(item) {
    item.addEventListener("click", function() {
      let list = item.parentNode.querySelector(".content_list");
      slideList(list);
    });
  });

});

function slideToggle(menu) {
  if (isMenuOpened) {
    menu.classList.remove("open");
    isMenuOpened = false;
  } else {
    menu.classList.add("open");
    isMenuOpened = true;
  }
}

function slideList(list){
  let span = list.parentNode.querySelector("span");
  if(isContentOpened){
    list.classList.remove("content_open");
    isContentOpened = false;
    if (window.innerWidth <= 768) {
      span.textContent = "↓";   
    }
  } else{
    list.classList.add("content_open");
    isContentOpened = true;
    if (window.innerWidth <= 768) {
      span.textContent = "↑";   
    }
  }

}

// browserWidth 변화에 따른 content arrow 추가 및 제거
function handleResize() {
    let isSpan = document.querySelector(".arrow");
    if (window.innerWidth <= 768) {
      contentType.forEach(function(item) {
        if(!isSpan){
          let arrow = document.createElement("span");
          arrow.classList.add("arrow")
          arrow.style.float = "right"
          arrow.style.paddingRight = "3px"
          arrow.textContent = "↓";   
          item.appendChild(arrow);
        }
      });
    } else{
      if(isSpan){
        contentType.forEach(function(item) {
          let arrow = item.querySelector(".arrow");
          item.removeChild(arrow);
        });
      }
    }
  }
  
    // 초기 로딩 시에도 한 번 실행
    handleResize();
    
    // 브라우저 크기가 변할 때마다 실행
    window.addEventListener("resize", handleResize);