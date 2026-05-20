import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

/**
 * Button component with multiple variants
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.fullWidth - Full width button
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional classes
 */
const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    children,
    className = "",
    ...props
  },
  ref,
) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variants = {
    primary: `
      bg-orange-600 text-white
      hover:bg-orange-500 hover:shadow-glow hover:-translate-y-0.5
      active:bg-orange-700 active:translate-y-0
    `,
    secondary: `
      bg-transparent text-white
      border-2 border-gray-600
      hover:border-orange-500 hover:text-orange-500 hover:-translate-y-0.5
      active:border-orange-600
    `,
    ghost: `
      bg-transparent text-gray-300
      hover:bg-white/10 hover:text-white
      active:bg-white/5
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5
      active:bg-red-700
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
});

export default Button;
