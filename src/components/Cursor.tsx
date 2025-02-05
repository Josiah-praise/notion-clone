type Props = {
  color: string;
  x: number;
  y: number;
  name: string;
};

export default function Cursor({ color, x, y, name }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        zIndex: 50,
      }}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <div
        className={`inline px-4 border-2 rounded-lg`}
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
}
