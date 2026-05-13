export default function Affiche() {
    return (
        <div>
            <h1>À l'affiche</h1>
            <div className="affiche">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}>
                    <span className="badge-outline">Voir tous les jeux</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <div style={{ backgroundColor: 'white', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                        <div style={{ backgroundColor: 'var(--color-text-muted)', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                        <div style={{ backgroundColor: 'var(--color-text-muted)', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                        <div style={{ backgroundColor: 'var(--color-text-muted)', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
