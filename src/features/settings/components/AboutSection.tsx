
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Mail, Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AboutSection: React.FC = () => {
    const { t } = useTranslation();

    const sections = [
        {
            title: t('settings.about.github'),
            icon: <Github className="h-5 w-5" />,
            content: (
                <a
                    href="https://github.com/CodingRookie98/RegexLearning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline text-primary"
                >
                    CodingRookie98/RegexLearning
                    <ExternalLink className="h-3 w-3" />
                </a>
            )
        },
        {
            title: t('settings.about.credits'),
            icon: <Heart className="h-5 w-5 text-red-500" />, // Using Heart for credits as attribution usually implies gratitude
            content: (
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{t('settings.about.creditsDesc')}</span>
                    <a
                        href="https://github.com/aykutkardas/regexlearn.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline text-primary"
                    >
                        aykutkardas/regexlearn.com
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            )
        },
        {
            title: t('settings.about.contact'),
            icon: <Mail className="h-5 w-5" />,
            content: (
                <a
                    href="mailto:520whjoker@gmail.com"
                    className="flex items-center gap-2 hover:underline text-primary"
                >
                    520whjoker@gmail.com
                </a>
            )
        },
        // Sponsor section omitted for now as it was just hearts in the original MD,
        // but could be added if a link exists.
    ];

    return (
        <div className="space-y-6">
            {/* Quote Section */}
            <div className="text-center space-y-2 py-4">
                <blockquote className="text-lg font-medium italic text-muted-foreground border-l-4 pl-4 border-primary/50 mx-auto max-w-md">
                    "{t('settings.about.quote')}"
                </blockquote>
                <p className="text-sm text-muted-foreground/60">— {t('settings.about.quoteAuthor', { defaultValue: 'Anonymous' })}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                {sections.map((section, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-4 bg-muted/40 py-3">
                            <div className="p-2 bg-background rounded-full shadow-sm">
                                {section.icon}
                            </div>
                            <CardTitle className="text-base font-medium">
                                {section.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {section.content}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center pt-8 text-xs text-muted-foreground">
                <p>RegexLearning v{process.env.npm_package_version || '1.0.0'}</p>
                <p className="mt-1">Made with ❤️ by CodingRookie</p>
            </div>
        </div>
    );
};
