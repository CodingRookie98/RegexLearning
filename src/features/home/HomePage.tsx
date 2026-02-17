
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

// Import images
import learnImg from '@/assets/images/home/Learn.png';
import cheatSheetImg from '@/assets/images/home/Cheatsheet.png';
import playgroundImg from '@/assets/images/home/Playground.png';
import practiceImg from '@/assets/images/home/Practise.png';
import openSourceImg from '@/assets/images/home/Open Source.png';

interface HomePageProps {
    onNavigate: (view: 'learn' | 'sandbox' | 'cheatsheet' | 'challenges' | 'home') => void;
}

interface Section {
    titleKey: "home.learn.title" | "home.practice.title" | "home.cheatsheet.title" | "home.playground.title" | "home.opensource.title";
    descKey: "home.learn.desc" | "home.practice.desc" | "home.cheatsheet.desc" | "home.playground.desc" | "home.opensource.desc";
    img: string;
    actionKey: "home.learn.action" | "home.practice.action" | "home.cheatsheet.action" | "home.playground.action" | "home.opensource.action";
    onClick: () => void;
    reverse: boolean;
    isExternal?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { t } = useTranslation();

    const sections: Section[] = [
        {
            titleKey: 'home.learn.title',
            descKey: 'home.learn.desc',
            img: learnImg,
            actionKey: 'home.learn.action',
            onClick: () => onNavigate('learn'),
            reverse: false
        },
        {
            titleKey: 'home.practice.title',
            descKey: 'home.practice.desc',
            img: practiceImg,
            actionKey: 'home.practice.action',
            onClick: () => onNavigate('challenges'), // Practice links to Question Bank now
            reverse: true
        },
        {
            titleKey: 'home.cheatsheet.title',
            descKey: 'home.cheatsheet.desc',
            img: cheatSheetImg,
            actionKey: 'home.cheatsheet.action',
            onClick: () => onNavigate('cheatsheet'),
            reverse: false
        },
        {
            titleKey: 'home.playground.title',
            descKey: 'home.playground.desc',
            img: playgroundImg,
            actionKey: 'home.playground.action',
            onClick: () => onNavigate('sandbox'),
            reverse: true
        },
        {
            titleKey: 'home.opensource.title',
            descKey: 'home.opensource.desc',
            img: openSourceImg,
            actionKey: 'home.opensource.action',
            onClick: () => window.open('https://github.com/ziishaned/learn-regex', '_blank'),
            isExternal: true,
            reverse: false
        }
    ];

    return (
        <div className="flex-1 w-full h-full overflow-y-auto bg-background selection:bg-primary/20">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24 md:space-y-32">

                {/* Intro / Hero - Simplified as first section for now or add separate hero if needed */}

                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Text Content */}
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {t(section.titleKey)}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t(section.descKey)}
                            </p>
                            <Button
                                onClick={section.onClick}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {section.isExternal && <Github className="mr-2 h-5 w-5" />}
                                {t(section.actionKey)}
                                {!section.isExternal && <ArrowRight className="ml-2 h-5 w-5" />}
                            </Button>
                        </div>

                        {/* Image Content */}
                        <div className="flex-1 w-full flex justify-center">
                            <div className="relative">
                                {/* Decorative blob background could go here */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 -z-10" />
                                <img
                                    src={section.img}
                                    alt={t(section.titleKey)}
                                    className="w-full max-w-md md:max-w-lg object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Footer / CTA - Optional */}
                <div className="pt-20 pb-10 text-center border-t">
                    <p className="text-muted-foreground">
                        Built with ❤️ for the community.
                    </p>
                </div>

            </div>
        </div>
    );
};
