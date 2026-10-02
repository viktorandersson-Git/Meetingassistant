using Microsoft.AspNetCore.Mvc;
using MeetingassistantAPI.DTOs;
using MeetingassistantAPI.Services;

namespace MeetingassistantAPI.Controllers
{
    [ApiController]
    [Route("api/ai")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        // POST /api/ai/summarize
        [HttpPost("summarize")]
        public async Task<ActionResult<AiResponse>> Summarize([FromBody] SummarizeRequest request)
        {
            return await Ask(Prompts.Summarize, request.Notes);
        }

        // POST /api/ai/agenda
        [HttpPost("agenda")]
        public async Task<ActionResult<AiResponse>> Agenda([FromBody] AgendaRequest request)
        {
            string user = $"Möte: {request.Title}\nStarttid: {request.StartTime} \nLängd: {request.DurationMinutes} minuter\nÄmnen: {request.Topics}";
            return await Ask(Prompts.Agenda, user);
        }

        // POST /api/ai/invitation
        [HttpPost("invitation")]
        public async Task<ActionResult<AiResponse>> Invitation([FromBody] InvitationRequest request)
        {
            string user = $"Möte: {request.Title}\nNär: {request.DateTime}\nVar: {request.Location}\nSyfte: {request.Purpose}";
            return await Ask(Prompts.Invitation, user);
        }

        // Gemensam hjälpmetod så att alla tre endpoints hanterar fel likadant
        private async Task<ActionResult<AiResponse>> Ask(string system, string user)
        {
            try
            {
                var text = await _aiService.SendPrompt(system, user);
                return Ok(new AiResponse { Result = text });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "AI-tjänsten svarade inte: " + ex.Message });
            }
        }
    }
}
