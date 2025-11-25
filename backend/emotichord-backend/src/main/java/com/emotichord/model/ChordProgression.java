package com.emotichord.model;

public class ChordProgression {
    private String key;
    private String progression;
    private int tempo;
    private String style;
    private String description;
    
    public ChordProgression() {}
    
    public ChordProgression(String key, String progression, int tempo, String style, String description) {
        this.key = key;
        this.progression = progression;
        this.tempo = tempo;
        this.style = style;
        this.description = description;
    }
    
    // Getters and setters
    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
    
    public String getProgression() { return progression; }
    public void setProgression(String progression) { this.progression = progression; }
    
    public int getTempo() { return tempo; }
    public void setTempo(int tempo) { this.tempo = tempo; }
    
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}