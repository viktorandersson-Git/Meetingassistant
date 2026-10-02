using System.ComponentModel.DataAnnotations;

namespace MeetingassistantAPI.DTOs
{
    public class SummarizeRequest
    {
        [Required]
        [MinLength(10)]
        public string Notes { get; set; } = string.Empty;
    }
}
