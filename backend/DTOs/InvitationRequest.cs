using System.ComponentModel.DataAnnotations;

namespace MeetingassistantAPI.DTOs
{
    public class InvitationRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string DateTime { get; set; } = string.Empty;

        [Required]
        public string Location { get; set; } = string.Empty;

        public string Purpose { get; set; } = string.Empty;
    }
}
