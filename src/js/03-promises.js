import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};


refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(refs.delay.value, 10);
  const step = parseInt(refs.step.value, 10); 
  const amount = parseInt(refs.amount.value, 10);
 for (let i = 1; i <= amount; i++) {
   const totalDelay = delay + i * step;
   createPromise(i , totalDelay)
   .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
   
 

  }
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}