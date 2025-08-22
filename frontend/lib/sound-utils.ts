/**
 * Sound Effects Utility for Accessibility
 * Provides audio feedback for user interactions
 */

import React from 'react';

export type SoundType = 
  | 'click'
  | 'success'
  | 'error'
  | 'focus'
  | 'hover'
  | 'navigation'
  | 'notification'
  | 'upload'
  | 'complete'
  | 'warning';

interface SoundConfig {
  frequency: number;
  duration: number;
  volume: number;
  type: OscillatorType;
}

// Sound configurations for different interaction types
const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  click: { frequency: 800, duration: 100, volume: 0.3, type: 'sine' },
  success: { frequency: 523, duration: 200, volume: 0.4, type: 'sine' }, // C5 note
  error: { frequency: 220, duration: 300, volume: 0.4, type: 'sawtooth' }, // A3 note
  focus: { frequency: 1000, duration: 50, volume: 0.2, type: 'sine' },
  hover: { frequency: 600, duration: 80, volume: 0.15, type: 'sine' },
  navigation: { frequency: 440, duration: 150, volume: 0.3, type: 'sine' }, // A4 note
  notification: { frequency: 880, duration: 250, volume: 0.35, type: 'sine' }, // A5 note
  upload: { frequency: 659, duration: 180, volume: 0.3, type: 'sine' }, // E5 note
  complete: { frequency: 784, duration: 400, volume: 0.4, type: 'sine' }, // G5 note
  warning: { frequency: 311, duration: 200, volume: 0.35, type: 'triangle' }, // Eb4 note
};

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // Initialize AudioContext only when needed (user gesture required)
    this.initializeAudioContext = this.initializeAudioContext.bind(this);
  }

  private async initializeAudioContext(): Promise<void> {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Resume context if it's suspended (required by browser policies)
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
      } catch (error) {
        console.warn('Failed to initialize AudioContext:', error);
      }
    }
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public async playSound(soundType: SoundType): Promise<void> {
    if (!this.isEnabled) return;

    try {
      await this.initializeAudioContext();
      
      if (!this.audioContext) {
        console.warn('AudioContext not available');
        return;
      }

      const config = SOUND_CONFIGS[soundType];
      
      // Create oscillator for the sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Configure sound
      oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
      oscillator.type = config.type;
      
      // Configure volume envelope
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(config.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + config.duration / 1000);
      
      // Play sound
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + config.duration / 1000);
      
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  // Play success sequence (multiple tones)
  public async playSuccessSequence(): Promise<void> {
    if (!this.isEnabled) return;
    
    await this.playSound('success');
    setTimeout(() => this.playSound('complete'), 150);
  }

  // Play error sequence
  public async playErrorSequence(): Promise<void> {
    if (!this.isEnabled) return;
    
    await this.playSound('error');
    setTimeout(() => this.playSound('warning'), 100);
  }

  // Clean up resources
  public dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Global sound manager instance
export const soundManager = new SoundManager();

// Convenience functions for common use cases
export const playClickSound = () => soundManager.playSound('click');
export const playSuccessSound = () => soundManager.playSound('success');
export const playErrorSound = () => soundManager.playSound('error');
export const playFocusSound = () => soundManager.playSound('focus');
export const playHoverSound = () => soundManager.playSound('hover');
export const playNavigationSound = () => soundManager.playSound('navigation');
export const playNotificationSound = () => soundManager.playSound('notification');
export const playUploadSound = () => soundManager.playSound('upload');
export const playCompleteSound = () => soundManager.playSound('complete');
export const playWarningSound = () => soundManager.playSound('warning');

// Initialize sound manager with accessibility settings
export const initializeSoundManager = (enabled: boolean) => {
  soundManager.setEnabled(enabled);
};

// Hook for React components to use sound effects
export const useSoundEffects = (soundEnabled: boolean) => {
  React.useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  return {
    playClick: () => soundManager.playSound('click'),
    playSuccess: () => soundManager.playSuccessSequence(),
    playError: () => soundManager.playErrorSequence(),
    playFocus: () => soundManager.playSound('focus'),
    playHover: () => soundManager.playSound('hover'),
    playNavigation: () => soundManager.playSound('navigation'),
    playNotification: () => soundManager.playSound('notification'),
    playUpload: () => soundManager.playSound('upload'),
    playComplete: () => soundManager.playSound('complete'),
    playWarning: () => soundManager.playSound('warning'),
  };
};
