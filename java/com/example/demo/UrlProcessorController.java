package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import RentExtractionFiles.WebsiteExtractor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*") // Allow requests from any origin; adjust as needed
public class UrlProcessorController {
    @PostMapping("/process-urls")
    public ResponseEntity<String> processUrls(@RequestBody String csvData) {
        // Log received data for debugging
        System.out.println("Received CSV Data: " + csvData);

        if (csvData == null || csvData.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("No CSV data provided.");
        }

        try {
            // Split CSV data into a list of URLs
            List<String> urls = Arrays.asList(csvData.split(","));

            // Simulate processing of each URL (replace this with actual logic)
            List<String> processedUrls = urls.stream()
                    .map(url -> processUrl(url))
                    .collect(Collectors.toList());

            // Return processed data as a single string (customize as needed)
            return ResponseEntity.ok(String.join("\n", processedUrls));
        } catch (Exception e) {
            // Log the exception and return a 500 error response
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing URLs: " + e.getMessage());
        } finally {
            // Clean up and close the WebDriver instance

        }
    }

    private String processUrl(String url) {
        try {
            return WebsiteExtractor.startWebsiteExtraction(url);
        } catch (Exception e) {
            e.printStackTrace();
            return "Invalid URL.";
        }
    }
}
