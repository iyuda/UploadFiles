using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

[ApiController]
[Route("api/[controller]")]
public class FileUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public FileUploadController(IWebHostEnvironment env)
    {
        _env = env;
    }
    [HttpGet]
    public IActionResult Test() => Ok("Controller is working");
    [HttpPost]
    [RequestSizeLimit(50 * 1024 * 1024)] // 50 MB limit
    public async Task<IActionResult> Upload(List<IFormFile> files)
    {
        var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        foreach (var file in files)
        {
            if (file.Length > 0)
            {
                var filePath = Path.Combine(uploadPath, file.FileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
            }
        }

        return Ok(new { Message = $"{files.Count} file(s) uploaded successfully." });
        //return Ok(new { count = files.Count });
    }
}
