// src/components/ui/Divider.jsx

const VerticalDivider = ({ className = '' }) => {
    return (
        <div className={`border-l border-[var(--color-surface-alt)] self-stretch mx-4 ${className}`} />
    );
};

export default VerticalDivider;