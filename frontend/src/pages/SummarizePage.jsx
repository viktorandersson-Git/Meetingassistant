import { useState } from "react";
import { summarize } from "../api/aiApi";
import ResultBox from "../components/ResultBox";

export default function SummarizePage() {
    const [notes, setNotes] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult("");
        try {
            setResult(await summarize(notes));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2>Sammanfatta mötesanteckningar</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Anteckningar
                    <textarea
                        rows={10}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="T.ex. Anna: demon klar fredag. Erik fixar login-buggen till onsdag..."
                        required
                    />
                </label>
                <button disabled={loading}>
                    {loading ? "Sammanfattar …" : "Sammanfatta"}
                </button>
            </form>
            <ResultBox loading={loading} error={error} result={result} />
        </section>
    );
}
