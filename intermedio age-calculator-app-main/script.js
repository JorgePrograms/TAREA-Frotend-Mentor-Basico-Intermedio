const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function validateDate(day, month, year) {
  if (month < 1 || month > 12) return false;

  const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return day >= 1 && day <= maxDays[month - 1];
}

function calculateAge(day, month, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let ageYear = currentYear - year;
  let ageMonth = currentMonth - month;
  let ageDay = currentDay - day;

  if (ageDay < 0) {
    ageMonth--;
    ageDay += isLeapYear(currentYear) ? 29 : 28;
  }
  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
  }

  return [ageYear, ageMonth, ageDay];
}

function handleSubmit(e) {
  e.preventDefault();

  const day = parseInt(dayInp.value);
  const month = parseInt(monthInp.value);
  const year = parseInt(yearInp.value);

  if (!validateDate(day, month, year)) {
    alert("Invalid date!");
    return;
  }

  const [ageYear, ageMonth, ageDay] = calculateAge(day, month, year);

  dayOtp.innerHTML = ageDay;
  monthOtp.innerHTML = ageMonth;
  yearOtp.innerHTML = ageYear;
}

form.addEventListener("submit", handleSubmit);
