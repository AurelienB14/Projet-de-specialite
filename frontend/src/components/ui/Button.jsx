
const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    disabled = false,
    loading = false,
    onClick 
}) => {

    const variants = {
        primary: 'bg-primary-transparent text-black hover:bg-primary',
        secondary: 'border border-[#00FFAA] text-[#00FFAA] hover:bg-[#00FFAA] hover:text-black',
        danger: 'bg-[#FF4444] text-white hover:bg-[#cc0000]',
        ghost: 'text-white hover:bg-[#2E2E2E]',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-5 py-2 text-base',
        lg: 'px-8 py-3 text-lg',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                rounded-lg font-medium transition-all duration-200 cursor-pointer
                ${variants[variant]}
                ${sizes[size]}
                ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Chargement...
                </span>
            ) : children}
        </button>
    );
};

export default Button;