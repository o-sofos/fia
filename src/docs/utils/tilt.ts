/**
 * Applies a 3D tilt effect to an element based on mouse position.
 * @param element The DOM element to tilt
 * @param intensity The strength of the tilt (default: 10)
 */
export function applyTilt(element: HTMLElement, intensity = 10) {
    let bounds: DOMRect;

    const onMouseEnter = () => {
        bounds = element.getBoundingClientRect();
        element.style.transition = 'transform 0.1s ease-out';
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!bounds) bounds = element.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    };

    const onMouseLeave = () => {
        element.style.transition = 'transform 0.5s ease-out';
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    // Cleanup function
    return () => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
    };
}
