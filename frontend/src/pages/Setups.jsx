import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

async function fetchSetups() {
    const res = await fetch(`${API_URL}/setups`);
    if (!res.ok) throw new Error("Erreur chargement");
    return res.json();
}
async function createSetup(data) {
    const res = await fetch(`${API_URL}/setups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur création");
    return res.json();
}
async function updateSetup(id, data) {
    const res = await fetch(`${API_URL}/setups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur modification");
    return res.json();
}
async function deleteSetup(id) {
    const res = await fetch(`${API_URL}/setups/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression");
}

const EMPTY_FORM = { processeur: "", memoire: 8, carte_graphique: "", stockage: 256 };

function SetupForm({ initial, onSubmit, onCancel, isEdit }) {
    const [form, setForm] = useState(initial || EMPTY_FORM);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div style={styles.formWrap}>
            <button onClick={onCancel} style={styles.backBtn}>← Retour</button>
            <h2 style={styles.formTitle}>{isEdit ? "Modifier le setup" : "Nouveau setup"}</h2>
            <div style={styles.formCard}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Processeur</label>
                    <input
                        style={styles.input}
                        placeholder="ex: Intel Core i9-13900K"
                        value={form.processeur}
                        onChange={e => set("processeur", e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Mémoire RAM</label>
                    <select style={styles.input} value={form.memoire} onChange={e => set("memoire", parseInt(e.target.value))}>
                        <option value={4}>4 Go</option>
                        <option value={8}>8 Go</option>
                        <option value={16}>16 Go</option>
                        <option value={32}>32 Go</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Carte graphique</label>
                    <input
                        style={styles.input}
                        placeholder="ex: RTX 4090"
                        value={form.carte_graphique}
                        onChange={e => set("carte_graphique", e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Stockage</label>
                    <select style={styles.input} value={form.stockage} onChange={e => set("stockage", parseInt(e.target.value))}>
                        <option value={128}>128 Go</option>
                        <option value={256}>256 Go</option>
                        <option value={512}>512 Go</option>
                        <option value={1000}>1 To</option>
                        <option value={2000}>2 To</option>
                    </select>
                </div>
                <div style={styles.formActions}>
                    <button style={styles.btnPrimary} onClick={() => onSubmit(form)}>
                        {isEdit ? "Enregistrer" : "Créer"}
                    </button>
                    <button style={styles.btnGhost} onClick={onCancel}>Annuler</button>
                </div>
            </div>
        </div>
    );
}

function SetupCard({ setup, onEdit, onDelete }) {
    const gpu = setup.carte_graphique || setup.carteGraphique || "—";
    const stockageLabel = setup.stockage >= 1000 ? `${setup.stockage / 1000} To` : `${setup.stockage} Go`;
    const initial = setup.processeur?.[0]?.toUpperCase() || "S";

    return (
        <div style={styles.card}>
            <div style={styles.avatar}>{initial}</div>
            <div style={styles.cardBody}>
                <div style={styles.cardName}>{setup.processeur}</div>
                <div style={styles.cardSub}>{gpu}</div>
                <div style={styles.cardSub}>{setup.memoire} Go RAM · {stockageLabel}</div>
            </div>
            <div style={styles.cardActions}>
                <button style={styles.btnEdit} onClick={() => onEdit(setup)}>Modifier</button>
                <button style={styles.btnDelete} onClick={() => onDelete(setup.id)}>Supprimer</button>
            </div>
        </div>
    );
}

export default function Setups() {
    const [view, setView] = useState("list");
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editTarget, setEditTarget] = useState(null);

    const load = async () => {
        setLoading(true);
        setError(null);
        try { setSetups(await fetchSetups()); }
        catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (data) => {
        try { await createSetup(data); await load(); setView("list"); }
        catch (e) { alert(e.message); }
    };

    const handleEdit = async (data) => {
        try { await updateSetup(editTarget.id, data); await load(); setView("list"); setEditTarget(null); }
        catch (e) { alert(e.message); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Supprimer ce setup ?")) return;
        try { await deleteSetup(id); setSetups(s => s.filter(x => x.id !== id)); }
        catch (e) { alert(e.message); }
    };

    if (view === "create") return <SetupForm onSubmit={handleCreate} onCancel={() => setView("list")} isEdit={false} />;
    if (view === "edit" && editTarget) return <SetupForm initial={editTarget} onSubmit={handleEdit} onCancel={() => { setView("list"); setEditTarget(null); }} isEdit={true} />;

    return (
        <div style={styles.page}>
            <div style={styles.topBar}>
                <h1 style={styles.pageTitle}>Setups</h1>
                <button style={styles.btnPrimary} onClick={() => setView("create")}>+ Ajouter</button>
            </div>

            {loading && <p style={styles.info}>Chargement...</p>}
            {error && <p style={{ ...styles.info, color: "#ff4466" }}>{error}</p>}
            {!loading && !error && setups.length === 0 && <p style={styles.info}>Aucun setup enregistré.</p>}

            <div style={styles.list}>
                {setups.map(s => (
                    <SetupCard key={s.id} setup={s} onEdit={setup => { setEditTarget(setup); setView("edit"); }} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

const styles = {
    page: { padding: "2rem", color: "#fff" },
    topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" },
    pageTitle: { fontSize: "1.5rem", fontWeight: "700", margin: 0 },
    list: { display: "flex", flexDirection: "column", gap: "0.75rem" },
    card: { display: "flex", alignItems: "center", gap: "1rem", background: "#1e1e1e", borderRadius: "12px", padding: "1rem 1.25rem" },
    avatar: { width: "44px", height: "44px", borderRadius: "50%", background: "#00e5a0", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "1.1rem", flexShrink: 0 },
    cardBody: { flex: 1 },
    cardName: { fontWeight: "700", fontSize: "1rem", marginBottom: "0.15rem" },
    cardSub: { fontSize: "0.85rem", color: "#aaa" },
    cardActions: { display: "flex", gap: "0.5rem", flexShrink: 0 },
    btnPrimary: { background: "#00e5a0", color: "#000", border: "none", borderRadius: "8px", padding: "0.5rem 1.25rem", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" },
    btnGhost: { background: "transparent", color: "#aaa", border: "1px solid #333", borderRadius: "8px", padding: "0.5rem 1.25rem", cursor: "pointer", fontSize: "0.9rem" },
    btnEdit: { background: "transparent", color: "#00e5a0", border: "1px solid #00e5a0", borderRadius: "8px", padding: "0.35rem 0.9rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600" },
    btnDelete: { background: "transparent", color: "#ff4466", border: "1px solid #ff4466", borderRadius: "8px", padding: "0.35rem 0.9rem", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600" },
    info: { color: "#aaa", fontSize: "0.9rem", padding: "2rem 0" },
    formWrap: { padding: "2rem", maxWidth: "500px" },
    formTitle: { fontSize: "1.4rem", fontWeight: "700", marginBottom: "1.25rem", color: "#fff" },
    formCard: { background: "#1e1e1e", borderRadius: "12px", padding: "1.5rem" },
    formGroup: { marginBottom: "1rem" },
    label: { display: "block", fontSize: "0.8rem", color: "#aaa", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" },
    input: { width: "100%", background: "#2a2a2a", border: "1px solid #333", borderRadius: "8px", padding: "0.6rem 0.9rem", color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" },
    formActions: { display: "flex", gap: "0.75rem", marginTop: "1.5rem" },
    backBtn: { background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 },
};