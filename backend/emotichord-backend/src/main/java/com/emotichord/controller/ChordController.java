package com.emotichord.controller;

import com.emotichord.model.ChordProgression;
import com.emotichord.service.MusicService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChordController {

    private final MusicService musicService;
    
    // Spring will automatically inject the MusicService
    public ChordController(MusicService musicService) {
        this.musicService = musicService;
    }

    @GetMapping("/generate")
    public ChordProgression generateChord(@RequestParam("emotion") String emotion) {
        return musicService.getProgressionForEmotion(emotion);
    }
}