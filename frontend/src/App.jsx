import { useState } from "react";
import InvitationPage from "./pages/InvitationPage";
import AgendaPage from "./pages/AgendaPage";
import SummarizePage from "./pages/SummarizePage";

export default function App() {
    const [tab, setTab] = useState("invitation");

    return (
        <div className="app">
            <header>
                <h1>Mötesassistent</h1>
                <p>AI hjälper dig före och efter mötet – du bestämmer.</p>
            </header>

            <nav className="tabs">
                <button
                    className={tab === "invitation" ? "active" : ""}
                    onClick={() => setTab("invitation")}
                >
                    Inbjudan
                </button>
                <button
                    className={tab === "agenda" ? "active" : ""}
                    onClick={() => setTab("agenda")}
                >
                    Agenda
                </button>
                <button
                    className={tab === "summarize" ? "active" : ""}
                    onClick={() => setTab("summarize")}
                >
                    Sammanfattning
                </button>
            </nav>

            <main className="card">
                {tab === "invitation" && <InvitationPage />}
                {tab === "agenda" && <AgendaPage />}
                {tab === "summarize" && <SummarizePage />}
            </main>
        </div>
    );
}
