using System.ComponentModel.DataAnnotations;

namespace MeetingassistantAPI.DTOs
{
    public class AgendaRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        public string StartTime { get; set; } = string.Empty;

        public int DurationMinutes { get; set; } = 60;

        [Required]
        public string Topics { get; set; } = string.Empty;
    }
}
