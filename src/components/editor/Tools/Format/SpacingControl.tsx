// ============================================================================
// SPACING CONTROL COMPONENT
// ============================================================================
interface SpacingProps {
  label: string;
  value: number;
  unit: string;
  onChange: (newValue: number) => void;
  step: number;
  min?: number;
  max?: number;
}

export default function SpacingControl({
  label,
  value,
  unit,
  onChange,
  step,
  min = 0,
  max = 10,
}: SpacingProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex border border-neutral-dark/20 rounded-md overflow-hidden">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
        >
          <span className="text-sm">−</span>
        </button>
        <p className="text-sm flex items-center w-8 h-8 justify-center">
          {value.toFixed(step < 1 ? 2 : 0)}
        </p>
        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex items-center justify-center w-8 h-8 hover:bg-neutral-light/30 active:bg-neutral-dark/20 transition-colors"
        >
          <span className="text-sm">+</span>
        </button>
      </div>
      <span className="flex-1 text-xs text-neutral-dark">{label}</span>
    </div>
  );
}