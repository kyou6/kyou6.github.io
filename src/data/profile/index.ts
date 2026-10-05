export * from './types';
export * from './introduction';
export * from './educationalBackground';
export * from './workExperience';
export * from './achievements';
export * from './resume';

import { introductionData } from './introduction';
import { educationalBackgroundData } from './educationalBackground';
import { workExperienceData } from './workExperience';
import { achievementsData } from './achievements';
import { resumeData } from './resume';
import type { WorldOption } from './types';

export const profileOptions: WorldOption[] = [
    introductionData,
    educationalBackgroundData,
    workExperienceData,
    achievementsData,
    resumeData,
];
