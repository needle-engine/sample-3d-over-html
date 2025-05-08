import { Behaviour, Mathf, serializable } from '@needle-tools/engine';

// Simple example component that does nothing but rotate an object.
export class AutoRotate extends Behaviour {
  @serializable()
  speed: number = 0.5;

  update(): void {
    this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
  }
}

export class RotateAngle extends Behaviour {
  @serializable()
  targetAngle: number = 0;

  rotateTowards(angleInDegrees: number) {
    if (Number.isNaN(angleInDegrees)) return;
    this.targetAngle = Mathf.toRadians(angleInDegrees);
  }
  rotateBy(angleInDegrees: number) {
    if (Number.isNaN(angleInDegrees)) return;
    this.targetAngle += Mathf.toRadians(angleInDegrees);
  }

  onBeforeRender() {
    this.gameObject.rotation.y = Mathf.lerp(
      this.gameObject.rotation.y,
      this.targetAngle,
      this.context.time.deltaTime / 0.1
    );
  }
}
