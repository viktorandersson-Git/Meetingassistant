import { useState } from "react";

// Visar laddning, fel eller AI-svaret (med kopiera-knapp).
export default function ResultBox({ loading, error, result }) {
    const [copied, setCopied] = useState(false);

    if (loading) return <div className="result">AI:n skriver …</div>;
    if (error) return <div className="result error">{error}</div>;
    if (!result) return null;

    async function copy() {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="result">
            <div className="result-header">
                <span>AI-förslag – granska innan du använder det</span>
                <button type="button" className="secondary" onClick={copy}>
                    {copied ? "Kopierat!" : "Kopiera"}
                </button>
            </div>
            <pre>{result}</pre>
        </div>
    );
}
