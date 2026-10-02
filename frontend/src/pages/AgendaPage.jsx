import { useState } from "react";
import { createAgenda } from "../api/aiApi";
import ResultBox from "../components/ResultBox";

export default function AgendaPage() {
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(60);
    const [topics, setTopics] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult("");
        try {
            setResult(
                await createAgenda(title, startTime, Number(duration), topics),
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2>Skapa mötesagenda</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Mötets titel
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Sprintplanering vecka 38"
                        required
                    />
                </label>
                <div className="row">
                    <label>
                        Starttid
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </label>
                    <label>
                        Längd (minuter)
                        <input
                            type="number"
                            min="5"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <label>
                    Ämnen att ta upp
                    <textarea
                        rows={4}
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                        placeholder="Retro av förra sprinten, prioritera backlog, fördela ansvar"
                        required
                    />
                </label>
                <button disabled={loading}>
                    {loading ? "Skapar …" : "Skapa agenda"}
                </button>
            </form>
            <ResultBox loading={loading} error={error} result={result} />
        </section>
    );
}
