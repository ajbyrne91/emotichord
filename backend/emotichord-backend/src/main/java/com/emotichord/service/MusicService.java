package com.emotichord.service;

import com.emotichord.model.ChordProgression;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MusicService {
    
    private final Map<String, ChordProgression> emotionProgressions;
    
    public MusicService() {
        this.emotionProgressions = new HashMap<>();
        initializeProgressions();
    }
    
    private void initializeProgressions() {
        // Joyful progressions
        emotionProgressions.put("joy", new ChordProgression(
            "C Major", "I-V-vi-IV", 120, "Pop", 
            "Bright and uplifting - perfect for happy moments"
        ));
        emotionProgressions.put("happy", new ChordProgression(
            "G Major", "I-V-vi-iii-IV", 130, "Folk",
            "Cheerful and energetic campfire vibe"
        ));
        
        // Sad progressions
        emotionProgressions.put("sad", new ChordProgression(
            "A Minor", "i-vi-III-VII", 70, "Ballad",
            "Melancholic and introspective"
        ));
        emotionProgressions.put("melancholy", new ChordProgression(
            "D Minor", "i-iv-VII-III", 65, "Classical",
            "Deep emotional resonance with classical influence"
        ));
        
        // Energetic progressions
        emotionProgressions.put("excited", new ChordProgression(
            "E Major", "I-IV-V-IV", 140, "Rock",
            "High-energy driving rhythm"
        ));
        emotionProgressions.put("energetic", new ChordProgression(
            "F Major", "I-V-vi-IV", 150, "Dance",
            "Upbeat and danceable four-chord progression"
        ));
        
        // Romantic progressions
        emotionProgressions.put("romantic", new ChordProgression(
            "Db Major", "I-vi-ii-V", 90, "Jazz",
            "Smooth and sophisticated jazz progression"
        ));
        emotionProgressions.put("love", new ChordProgression(
            "Bb Major", "I-V-vi-iii-IV-I-IV-V", 100, "R&B",
            "Soulful progression with emotional resolution"
        ));
        
        // Default for unknown emotions
        emotionProgressions.put("default", new ChordProgression(
            "C Major", "I-IV-V-I", 120, "Universal", 
            "A balanced progression for any mood"
        ));
    }
    
    public ChordProgression getProgressionForEmotion(String emotion) {
        String normalizedEmotion = emotion.toLowerCase().trim();
        return emotionProgressions.getOrDefault(normalizedEmotion, 
            emotionProgressions.get("default")
        );
    }
}