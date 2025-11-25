/**
 * 
 */
package com.emotichord.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend to connect later

/**
 * ChordController
 * 
 * @author alexbyrne
 * @version 1.0
 * @since 25 Nov 2025
 */
public class ChordController {

	    @GetMapping("/generate")
	    public String generateChord(@RequestParam("emotion") String emotion) {
	        return "You requested music for emotion: " + emotion + "! 🎵";

	}

}
