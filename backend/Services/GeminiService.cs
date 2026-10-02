using Google.GenAI;
using Google.GenAI.Types;

namespace MeetingassistantAPI.Services
{
    public class GeminiService : IAiService
    {
        private readonly string _apiKey;

        public GeminiService(IConfiguration config)
        {
            _apiKey = config["GEMINI_API_KEY"] ?? "";
        }

        public async Task<string> SendPrompt(string systemPrompt, string userPrompt)
        {
            var client = new Client(apiKey: _apiKey);

            GenerateContentConfig config = new()
            {
                SystemInstruction = new Content
                {
                    Parts = [
                        new Part {
                            Text = systemPrompt,
                        }
                    ]
                }
            };

            var response = await client.Models.GenerateContentAsync(model: "gemini-3.5-flash", contents: userPrompt, config);

            return response.Candidates[0].Content.Parts[0].Text;
        }
    }
}
