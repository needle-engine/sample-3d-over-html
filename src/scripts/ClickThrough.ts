import { Behaviour, NEPointerEvent, showBalloonMessage } from '@needle-tools/engine';

export class ClickThrough extends Behaviour {
  onEnable() {
    // Register for pointer down and pointer move event
    this.context.input.addEventListener('pointerdown', this.onPointerEvent);
    this.context.input.addEventListener('pointermove', this.onPointerEvent, {
      queue: 100,
    });
    window.addEventListener("touchend", this.onTouchEnd, { passive: true });
  }
  onDisable() {
    this.context.input.removeEventListener('pointerdown', this.onPointerEvent);
    this.context.input.removeEventListener('pointermove', this.onPointerEvent);
    window.removeEventListener("touchend", this.onTouchEnd);
    this.context.domElement.style.pointerEvents = 'all';
  }
  onPointerEnter() {
    /** do nothing, necessary to raycast children */
  }

  private onPointerEvent = (evt: NEPointerEvent) => {
    if (evt.pointerId > 0) return;
    const intersections = evt.intersections;
    // If we don't had any intersections during the 3D raycasting then we disable pointer events for the needle-engine element so that content BEHIND the 3D element can receive pointer events
    if (intersections?.length <= 0) {
      this.context.domElement.style.pointerEvents = 'none';
    } else {
      this.context.domElement.style.pointerEvents = 'all';
    }
  };

  private onTouchEnd = (_evt: TouchEvent) => {
    setTimeout(() => {
      this.context.domElement.style.pointerEvents = 'all';
    }, 100);
  }
}
