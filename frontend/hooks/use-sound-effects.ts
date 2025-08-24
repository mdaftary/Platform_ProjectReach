'use client'

import React, { useCallback } from 'react'
import { useAccessibility } from '@/app/accessibility-provider'
import { soundManager, SoundType } from '@/lib/sound-utils'
export const useSoundEffects = () => {
  const { soundEnabled } = useAccessibility()

  const playSound = useCallback((soundType: SoundType) => {
    if (soundEnabled) {
      soundManager.playSound(soundType)
    }
  }, [soundEnabled])

  const playSuccessSequence = useCallback(() => {
    if (soundEnabled) {
      soundManager.playSuccessSequence()
    }
  }, [soundEnabled])

  const playErrorSequence = useCallback(() => {
    if (soundEnabled) {
      soundManager.playErrorSequence()
    }
  }, [soundEnabled])

  const sounds = {
    click: () => playSound('click'),
    success: () => playSound('success'),
    complete: () => playSound('complete'),
    successSequence: playSuccessSequence,
    error: () => playSound('error'),
    warning: () => playSound('warning'),
    errorSequence: playErrorSequence,
    navigation: () => playSound('navigation'),
    focus: () => playSound('focus'),
    hover: () => playSound('hover'),
    notification: () => playSound('notification'),
    upload: () => playSound('upload'),
  }

  return {
    playSound,
    sounds,
    isEnabled: soundEnabled,
  }
}

export const createSoundHandler = (soundType: SoundType, callback?: () => void) => {
  return () => {
    soundManager.playSound(soundType)
    callback?.()
  }
}
