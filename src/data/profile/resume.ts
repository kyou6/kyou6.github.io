import type { WorldOption } from './types';
import resumeIcon from '../../assets/profile/resume.png';

export const resumeData: WorldOption = {
    label: "Resume",
    color: "#B22222",
    image: resumeIcon,
    description: "Comprehensive professional resume summarizing technical skills, work experience, past projects, and contact information.",
    details: [
        { label: "Experience", value: "2+ Years" },
        { label: "Stack", value: "HTML/CSS, JavaScript, Python, C++" },
        { label: "Format", value: "Online / Interactive" }
    ]
};
