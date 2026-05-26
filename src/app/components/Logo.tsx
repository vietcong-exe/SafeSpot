import logoImage from '../../imports/hospital.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={logoImage}
        alt="Safe Spot"
        className={sizes[size]}
      />
      {showText && (
        <h2 className={`${textSizes[size]} font-semibold text-foreground`}>
          Safe Spot
        </h2>
      )}
    </div>
  );
}
