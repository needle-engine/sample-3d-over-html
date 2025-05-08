import { onStart, OrbitControls, ContactShadows } from '@needle-tools/engine';
import { ClickThrough } from './scripts/ClickThrough.js';
import { AutoRotate, RotateAngle } from './scripts/Rotate.js';

let rotateComponent: RotateAngle | null = null;

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('button#open_docs')
    ?.addEventListener('click', (evt) => {
      console.log('CLICK', evt);
      window.open('https://docs.needle.tools');
    });

  const srcButtons = document.querySelectorAll<HTMLButtonElement>('button[data-src]');
  let clicked = false;
  srcButtons.forEach((button) => {
    const src = button.getAttribute('data-src');
    button.addEventListener('click', (_) => {
      const needle_engine = document.querySelector('needle-engine');
      if (needle_engine && src) {
        needle_engine.setAttribute('src', src);
      }
      const background = button.getAttribute('data-background-color');
      if (background) {
        document.body.style.backgroundColor = background;
      }
    });
    // click first button
    if (!clicked) {
      clicked = true;
      button.click();
    }
  });

  const rotateButtons = document.querySelectorAll('button[data-rotate]');
  rotateButtons.forEach((button) => {
    button.addEventListener('click', (_) => {
      const value = Number.parseFloat(
        button.getAttribute('data-rotate') || '0'
      );
      if (value && rotateComponent) {
        rotateComponent.rotateBy(value);
      }
    });
  });
});

onStart((context) => {
  // context.menu.setVisible(false);
  // context.menu.showQRCodeButton(true);

  const scene = context.scene;
  scene.addComponent(ClickThrough);
  rotateComponent =
    context.scene.children[0]?.addComponent(RotateAngle) || null;

  const orbit = context.mainCamera.getComponent(OrbitControls);
  if (orbit) {
    orbit.enablePan = false;
    orbit.doubleClickToFocus = false;
    orbit.middleClickToFocus = false;
    orbit.autoTarget = false;
    orbit.fitCamera({
      immediate: true,
    });
  }
  ContactShadows.auto();
});
