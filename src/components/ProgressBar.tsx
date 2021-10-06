import React from 'react';
import classes from './ProgressBar.module.css';

const ProgressBar: React.FunctionComponent = () => {
  let progress: HTMLDivElement;
  let prev: HTMLButtonElement;
  let next: HTMLButtonElement;
  let circles: NodeListOf<HTMLElement>;

  React.useEffect(() => {
    progress = document.getElementById('progress') as HTMLDivElement;
    prev = document.getElementById('prev') as HTMLButtonElement;
    next = document.getElementById('next') as HTMLButtonElement;
    circles = document.querySelectorAll<HTMLElement>(`.${classes.circle}`);
    next.addEventListener('click', () => {
      currentActive++;
      if (currentActive > circles.length) {
        currentActive = circles.length;
      }
      update();
    });

    prev.addEventListener('click', () => {
      currentActive--;
      if (currentActive < 1) {
        currentActive = 1;
      }
      update();
    });
  }, []);

  let currentActive = 1;

  const update = () => {
    circles.forEach((circle, idx) => {
      if (idx < currentActive) {
        circle.classList.add(`${classes.active}`);
      } else {
        circle.classList.remove(`${classes.active}`);
      }
    });

    const actives = document.querySelectorAll<HTMLElement>(
      `.${classes.active}`
    );

    progress.style.width =
      ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

    if (currentActive === 1) {
      prev.disabled = true;
    } else if (currentActive === circles.length) {
      next.disabled = true;
    } else {
      prev.disabled = false;
      next.disabled = false;
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes['progress-container']}>
        <div className={classes.progress} id="progress"></div>
        <div className={`${classes.circle} ${classes.active}`}>1</div>
        <div className={classes.circle}>2</div>
        <div className={classes.circle}>3</div>
        <div className={classes.circle}>4</div>
      </div>

      <button className={classes.btn} id="prev" disabled>
        Prev
      </button>
      <button className={classes.btn} id="next">
        Next
      </button>
    </div>
  );
};

export default ProgressBar;
