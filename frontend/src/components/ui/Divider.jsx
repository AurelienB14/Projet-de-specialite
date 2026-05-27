// src/components/ui/Divider.jsx

const Divider = ({ className = 'flex w-full' }) => {
    return (
        <hr className={`border-[var(--color-surface-alt)] my-4 ${className}`} />
    );
};

export default Divider;