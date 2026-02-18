
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Monitor, Globe, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AboutSection } from './components/AboutSection';
import { StoreService } from '@/services/storeService';
import { ChallengeProgressService } from '@/services/challengeProgressService';

export const SettingsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { setTheme, theme } = useTheme();

    const handleResetProgress = async () => {
        if (confirm(t('settings.data.resetConfirm'))) {
            try {
                await StoreService.resetUserProgress();
                await ChallengeProgressService.resetProgress();
                alert(t('settings.data.resetSuccess'));
                window.location.reload();
            } catch (e) {
                console.error("Failed to reset progress", e);
                alert(t('settings.data.resetError'));
            }
        }
    };

    return (
        <div className="h-full w-full overflow-y-auto p-6 bg-background custom-scrollbar">
            <div className="max-w-3xl mx-auto space-y-8 pb-10">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">{t('settings.title')}</h2>
                    <p className="text-muted-foreground">{t('settings.subtitle')}</p>
                </div>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            {t('settings.appearance.title')}
                        </CardTitle>
                        <CardDescription>{t('settings.appearance.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>{t('settings.appearance.theme')}</Label>
                            <div className="flex bg-muted p-1 rounded-lg">
                                {['light', 'dark', 'system'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setTheme(mode)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${theme === mode
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {t(`settings.appearance.${mode}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Language */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            {t('settings.language.title')}
                        </CardTitle>
                        <CardDescription>{t('settings.language.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Label>{t('settings.language.select')}</Label>
                            <div className="flex bg-muted p-1 rounded-lg">
                                {['en', 'zh'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => i18n.changeLanguage(lang)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${i18n.language === lang
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {lang === 'en' ? 'English' : '中文'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Zone */}
                <Card className="border-destructive/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-5 w-5" />
                            {t('settings.data.title')}
                        </CardTitle>
                        <CardDescription>{t('settings.data.desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="font-medium text-destructive">{t('settings.data.resetLabel')}</span>
                                <p className="text-sm text-muted-foreground">{t('settings.data.resetHelp')}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={handleResetProgress}>
                                {t('settings.data.resetBtn')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* About */}
                <AboutSection />
            </div>
        </div>
    );
};
