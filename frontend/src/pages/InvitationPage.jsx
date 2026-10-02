import { useState } from "react";
import { createInvitation } from "../api/aiApi";
import ResultBox from "../components/ResultBox";

export default function InvitationPage() {
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
    const [purpose, setPurpose] = useState("");
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
                await createInvitation(title, dateTime, location, purpose),
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2>Skapa mötesinbjudan</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Mötets namn
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Sprintplanering vecka 38"
                        required
                    />
                </label>
                <div className="row">
                    <label>
                        När
                        <input
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            placeholder="torsdag 10:00–11:00"
                            required
                        />
                    </label>
                    <label>
                        Var
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="konferensrum Orion"
                            required
                        />
                    </label>
                </div>
                <label>
                    Syfte
                    <textarea
                        rows={3}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Planera kommande sprint, prioritera arbetsuppgifter och fördela ansvar"
                    />
                </label>
                <button disabled={loading}>
                    {loading ? "Skriver …" : "Skapa inbjudan"}
                </button>
            </form>
            <ResultBox loading={loading} error={error} result={result} />
        </section>
    );
}
