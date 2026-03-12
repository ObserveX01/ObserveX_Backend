using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ObserveX.Api.Services;

public class ProctoringService
{
    private readonly InferenceSession? _session;
    private const int ImageSize = 640;

    public ProctoringService()
    {
        try
        {
            string projectRoot = Directory.GetCurrentDirectory();
            string modelPath = Path.Combine(projectRoot, "Models", "yolov8s.onnx");

            if (!File.Exists(modelPath))
                modelPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Models", "yolov8s.onnx");

            var options = new Microsoft.ML.OnnxRuntime.SessionOptions();
            options.GraphOptimizationLevel = GraphOptimizationLevel.ORT_ENABLE_ALL;

            if (File.Exists(modelPath))
            {
                _session = new InferenceSession(modelPath, options);
                Console.WriteLine("✅ ObserveX AI Guard: Active & Responsive.");
            }
        }
        catch (Exception ex) { Console.WriteLine($"❌ AI Error: {ex.Message}"); }
    }

    public (bool isViolation, string message) AnalyzeFrame(Stream imageStream)
    {
        if (_session == null) return (false, "AI Offline");

        try
        {
            using var image = Image.Load<Rgb24>(imageStream);

            // ১. লাইট ডিটেকশন (উজ্জ্বলতা চেক)
            float totalBrightness = 0;
            image.ProcessPixelRows(accessor => {
                for (int y = 0; y < accessor.Height; y++) {
                    var row = accessor.GetRowSpan(y);
                    foreach (var pixel in row) totalBrightness += (0.299f * pixel.R + 0.587f * pixel.G + 0.114f * pixel.B);
                }
            });
            float avgBrightness = totalBrightness / (image.Width * image.Height);
            if (avgBrightness < 35) return (true, "Insufficient Lighting Detected");

            // ইমেজ রিসাইজ
            image.Mutate(x => x.Resize(new ResizeOptions { Size = new Size(640, 640), Mode = ResizeMode.Pad }));

            // ২. টেনসর কনভার্সন
            var input = new DenseTensor<float>(new[] { 1, 3, ImageSize, ImageSize });
            for (int y = 0; y < ImageSize; y++) {
                for (int x = 0; x < ImageSize; x++) {
                    var pixel = image[x, y];
                    input[0, 0, y, x] = pixel.R / 255f;
                    input[0, 1, y, x] = pixel.G / 255f;
                    input[0, 2, y, x] = pixel.B / 255f;
                }
            }

            // ৩. এআই প্রিডিকশন
            var inputs = new List<NamedOnnxValue> { NamedOnnxValue.CreateFromTensor("images", input) };
            using var results = _session.Run(inputs);
            var output = results.First().AsTensor<float>();

            float maxPhone = 0f;
            int personHits = 0;

            for (int i = 0; i < 8400; i++) {
                float person = output[0, 4, i];
                float phone = output[0, 71, i]; 
                if (person > 0.30f) personHits++;
                if (phone > maxPhone) maxPhone = phone;
            }

            // ৪. ইমিডিয়েট ভায়োলেশন লজিক
            if (maxPhone > 0.05f) return (true, "Mobile Phone Detected");
            if (personHits > 18) return (true, "Multiple People Detected");

            return (false, "Clear");
        }
        catch (Exception) { return (false, "Error"); }
    }
}