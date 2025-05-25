import { useState, useRef, FC } from 'react';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useClose } from 'src/hooks/useClose';

export const ArticleParamsForm: FC<{
	value: ArticleStateType;
	onChange: (v: ArticleStateType) => void;
}> = ({ value, onChange: onUpdateSettings }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [draftSettings, setDraftSettings] = useState<ArticleStateType>(value);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: containerRef,
	});

	const onChange = (field: keyof ArticleStateType, value: OptionType) => {
		setDraftSettings({ ...draftSettings, [field]: value });
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdateSettings(draftSettings);
	};

	const onReset = () => {
		setDraftSettings(defaultArticleState);
		onUpdateSettings(defaultArticleState);
	};

	return (
		<div ref={containerRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((v) => !v)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={draftSettings.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(v) => onChange('fontFamilyOption', v)}
					/>

					<RadioGroup
						name={'font-size'}
						options={fontSizeOptions}
						selected={draftSettings.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(v) => onChange('fontSizeOption', v)}
					/>

					<Select
						selected={draftSettings.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(v) => onChange('fontColor', v)}
					/>

					<Separator />

					<Select
						selected={draftSettings.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(v) => onChange('backgroundColor', v)}
					/>

					<Select
						selected={draftSettings.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(v) => onChange('contentWidth', v)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
