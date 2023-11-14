import flatpickr from 'flatpickr';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  datePicker: document.getElementById('datetime-picker'),
  btnStart: document.getElementById('start'),
  dataDays: document.querySelectorAll('[data-days]'),
  dataHours: document.querySelectorAll('[data-hours]'),
  dataMinutes: document.querySelectorAll('[data-minutes]'),
  dataSeconds: document.querySelectorAll('[data-seconds]'),
};

function convertMs(ms) {
  refs.btnStart.disabled = true;
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


let counters;
const currentDateInMilliseconds = Date.now();


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    if (selectedDates[0] <= currentDateInMilliseconds) {
      // window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
     
    } else {
      refs.btnStart.disabled = false;
    
      refs.btnStart.addEventListener('click', () => {
        refs.datePicker.disabled = true;
      
        counters = setInterval(() => {
          const currentDifference = selectedDates[0] - Date.now();

          // Прибирати інтервал коли таймер доходить до 0
          if (currentDifference <= 0) {
            clearInterval(counters);
            refs.datePicker.disabled = false;
            console.log('Timer reached 0'); // Вмикаємо кнопку після досягнення 0
          } else {
            const { days, hours, minutes, seconds } = convertMs(currentDifference);

            refs.dataDays.forEach(
              element => (element.textContent = addLeadingZero(days))
            );
            refs.dataHours.forEach(
              element => (element.textContent = addLeadingZero(hours))
            );
            refs.dataMinutes.forEach(
              element => (element.textContent = addLeadingZero(minutes))
            );
            refs.dataSeconds.forEach(
              element => (element.textContent = addLeadingZero(seconds))
            );
          }
        }, 1000);
      });
    }
  },
}
flatpickr(refs.datePicker, options);
