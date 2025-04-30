import React from 'react';

/**
 * VideoChatIcon Component
 *
 * Renders an SVG icon representing a video camera, suitable for video chat applications.
 *
 * @param {object} props - Component props.
 * @param {number} [props.size=24] - The width and height of the icon in pixels.
 * @param {string} [props.color='#ea580c'] - The stroke color of the icon. Defaults to orange (#ea580c).
 * @param {string} [props.strokeWidth=2] - The width of the icon's stroke.
 * @param {object} [props.style] - Inline styles for the SVG element.
 * @param {string} [props.className] - CSS classes for the SVG element.
 * @returns {JSX.Element} The SVG icon component.
 */
const VideoChatIcon = ({ size = 60, color = '#ea580c', strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} // Set width from props
    height={size} // Set height from props
    viewBox="0 0 24 24" // Standard 24x24 viewbox
    fill="none" // No fill for an outline icon
    stroke={color} // Set stroke color from props
    strokeWidth={strokeWidth} // Set stroke width from props
    strokeLinecap="round" // Use round line caps
    strokeLinejoin="round" // Use round line joins
    {...props} // Spread any additional props (e.g., className, style, onClick)
  >
    {/* Path for the triangular side part of the camera */}
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    {/* Path for the rectangular main body of the camera */}
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

// Export the component for use in other parts of a React application
export default VideoChatIcon;

/*
// Example Usage:
// You can use this component in your React app like this:

import VideoChatIcon from './VideoChatIcon'; // Adjust the import path

function MyVideoComponent() {
  return (
    <div>
      <button>
        <VideoChatIcon /> Start Call
      </button>
      <VideoChatIcon size={48} color="blue" />
      <VideoChatIcon size={16} color="#ea580c" style={{ marginRight: '8px' }} />
    </div>
  );
}
*/
