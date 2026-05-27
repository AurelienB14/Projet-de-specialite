// src/components/ui/Divider.jsx

const WhiteDivider = ({ className = 'flex w-full' }) => {
    return (
        <hr className={`border-[var(--color-surface-alt)] border-0.5 my-4 ${className}`} />
    );
};

export default WhiteDivider;