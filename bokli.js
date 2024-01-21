// localStorage에 저장된 값을 컬러모드로 사용할 수 있습니다.
const colorMode = window.localStorage.getItem("color_mode");
if (colorMode) {
  window.document.body.classList.add(colorMode);
}

const bodyTag = document.body;
const bodyClassList = bodyTag.classList;
const logo = document.querySelector(".logo");
const themeBtn = document.querySelector(".dark_mode_btn");

const totalProfit = document.querySelector(".total_profit p");
const totalProfitPercent = document.querySelector(".total_profit_persentage p");

const inputs = document.getElementsByTagName("input");
const calBtn = document.querySelector(".do_cal_btn");

const navBar = document.querySelector(".nav_bar")
const main = document.querySelector("main")
const calAreaWrap = document.querySelector(".cal_area");

function goMainPage() {
  window.location.href = "bokli.html";
}

// 웹뷰로 사용되는 경우에 userAgent에 앱의 컬러모드 값을 전달받아 사용할 수도 있습니다.
// 이 경우 웹뷰가 열릴 때 앱팀의 지원을 받아 변경된 UA값을 전달 해 줘야 합니다
const isDarkMode = window.navigator.userAgent.includes("{isDark property}");
if (isDarkMode) {
  window.document.body.classList.add("dark");
}

// 앞서 사용한 prefers-color-scheme 값을 확인 해 시스템의 컬러모드 초기값으로 사용할 수도 있습니다.
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  window.document.body.classList.add("dark");
}

// css media query 동작과 유사하게, 시스템의 컬러모드가 변경될 때 마다 이를 웹에 반영해 줄 수도 있습니다.
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
mediaQueryList.addEventListener("change", (e) => {
  if (e.matches) {
    window.document.body.classList.add("dark");
  } else {
    window.document.body.classList.remove("dark");
  }
});

function setTheme() {
  let table = document.querySelector(".profit_detail_table");
  let rows = table.querySelectorAll("tr");

  if (bodyClassList.contains("dark")) {
    // 다크 모드일 경우, 다크 모드 클래스 제거
    bodyClassList.remove("dark");
    // localStorage에 상태 저장
    window.localStorage.setItem("color_mode", "");
    logo.src = "img/m.lab.png";
    themeBtn.querySelector(".set_theme_img").src = "img/sun.png";

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.backgroundColor = "white";
      inputs[i].style.color = "#212529";
    }

    navBar.style.borderBottom = "1px solid #aaaaaa"
    main.style.backgroundColor = "lightgrey"
    calAreaWrap.style.backgroundColor = "white"
    calAreaWrap.style.borderColor = "#aaaaaa"
    calBtn.style.backgroundColor = "#52bcfd";
    calBtn.style.color = "white";

    rows.forEach((row, index) => {
      if (index % 2 == 1) {
        row.style.backgroundColor = "lightgrey";
      } else {
        row.style.backgroundColor = "white";
      }
    });
  } else {
    // 다크 모드가 아닐 경우, 다크 모드 클래스추가
    bodyClassList.add("dark");
    // localStorage에 상태 저장
    window.localStorage.setItem("color_mode", "dark");
    logo.src = "img/m.lab_dark.png";
    themeBtn.querySelector(".set_theme_img").src = "img/moon.png";

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.backgroundColor = "#212529";
      inputs[i].style.color = "white";
    }

    navBar.style.borderBottom = "1px solid #4f4f4f"
    main.style.backgroundColor = "#151515"
    calAreaWrap.style.backgroundColor = "#151515"
    calAreaWrap.style.borderColor = "#4f4f4f"
    calBtn.style.backgroundColor = "#212529";
    calBtn.style.color = "white";

    rows.forEach((row, index) => {
      if (index % 2 == 1) {
        row.style.backgroundColor = "#383e45";
      } else {
        row.style.backgroundColor = "#212529";
      }
    });
  }
}

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

  const csvBtn = document.createElement("button");
  csvBtn.classList.add("csv_btn")
  csvBtn.type = "button"
  csvBtn.addEventListener("click", function(){
    downloadCSV();
  })

  csvBtn.classList.add("csv_btn");
  csvBtn.textContent = "CSV 다운로드"

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

  th1.textContent = "기간";
  th2.textContent = "수익";
  th3.textContent = "총액";
  th4.textContent = "수익률";

  if (!bodyClassList.contains("dark")) {
    firstTr.style.backgroundColor = "white";
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

  if (!bodyClassList.contains("dark")) {
    rows.forEach((row, index) => {
      if (index % 2 == 1) {
        row.style.backgroundColor = "lightgrey";
      } else {
        row.style.backgroundColor = "white";
      }
    });
  }
}

function downloadCSV() {
  // 테이블 요소 선택
  const table = document.querySelector(".profit_detail_table");
  
  // CSV 문자열 초기화
  let csv = '';

  // 테이블 행 순회
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];

    // 테이블 열 순회
    for (let j = 0; j < row.cells.length; j++) {
      const cellText = row.cells[j].textContent;

      // 콤마가 있으면 더블 쿼트로 감싸기
      const cellValue = cellText.includes(',') ? `"${cellText}"` : cellText;

      csv += cellValue + ',';
    }

    csv += '\n';
  }

  // CSV 파일 다운로드
  downloadFile(csv, 'table_data.csv');
}


function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

