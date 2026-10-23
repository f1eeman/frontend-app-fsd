export class FakeImage {
  static instances: FakeImage[] = []

  onload: (() => void) | null = null

  onerror: (() => void) | null = null

  src = ''

  constructor() {
    FakeImage.instances.push(this)
  }

  static last(): FakeImage {
    return FakeImage.instances[FakeImage.instances.length - 1]
  }
}

const OriginalImage = window.Image

export function mockImage(): void {
  FakeImage.instances = []
  window.Image = FakeImage as unknown as typeof Image
}

export function restoreImage(): void {
  window.Image = OriginalImage
}
