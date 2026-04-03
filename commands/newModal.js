const {
	SlashCommandBuilder,
	ModalBuilder,
	TextInputBuilder,
	LabelBuilder,
	TextInputStyle,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	TextDisplayBuilder,
	FileUploadBuilder,
	CheckboxBuilder,
	CheckboxGroupBuilder,
	CheckboxGroupOptionBuilder,
	RadioGroupBuilder,
	RadioGroupOptionBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new_modal')
		.setDescription('新しいモーダルを試しましょう！')
		.addIntegerOption((option) =>
			option
				.setName('number')
				.setDescription(
					'２ページに分かれているので、1か2を選択して入力してください',
				)
				.setRequired(true)
				.setChoices({ name: '1', value: 1 }, { name: '2', value: 2 }),
		),

	run: async (client, interaction) => {
		try {
			const number = interaction.options.getInteger('number');

			const modal = new ModalBuilder()
				.setCustomId('newModal')
				.setTitle('新しいモーダル');

			const shortTextInput = new LabelBuilder()
				.setLabel('短いテキスト入力')
				.setDescription('ここに短いテキストを入力してください')
				.setTextInputComponent(
					new TextInputBuilder()
						.setCustomId('shortTextInput')
						.setStyle(TextInputStyle.Short)
						.setPlaceholder('短いテキストを入力...')
						.setMinLength(5)
						.setMaxLength(50)
						.setValue('初期値01')
						.setRequired(true),
				);

			const paragraphTextInput = new LabelBuilder()
				.setLabel('段落テキスト入力')
				.setDescription('ここに段落テキストを入力してください')
				.setTextInputComponent(
					new TextInputBuilder()
						.setCustomId('paragraphTextInput')
						.setStyle(TextInputStyle.Paragraph)
						.setPlaceholder('段落テキストを入力...')
						.setMinLength(5)
						.setMaxLength(50)
						.setValue('初期値02')
						.setRequired(true),
				);

			const stringSelectMenu = new LabelBuilder()
				.setLabel('文字列セレクトメニュー')
				.setDescription('ここにセレクトメニューを追加してください')
				.setStringSelectMenuComponent(
					new StringSelectMenuBuilder()
						.setCustomId('stringSelectMenu')
						.setPlaceholder('オプションを選択...')
						.addOptions(
							new StringSelectMenuOptionBuilder()
								.setLabel('オプション 1')
								.setValue('option1')
								.setDescription('これはオプション 1 です')
								.setEmoji('🔥')
								.setDefault(true),
							new StringSelectMenuOptionBuilder()
								.setLabel('オプション 2')
								.setValue('option2')
								.setDescription('これはオプション 2 です')
								.setEmoji('🌟'),
							new StringSelectMenuOptionBuilder()
								.setLabel('オプション 3')
								.setValue('option3')
								.setDescription('これはオプション 3 です')
								.setEmoji('🚀'),
						),
				);

			const fileUploadInput = new LabelBuilder()
				.setLabel('ファイルアップロード')
				.setDescription(
					'ここにファイルアップロードコンポーネントを追加してください',
				)
				.setFileUploadComponent(
					new FileUploadBuilder()
						.setCustomId('fileUploadInput')
						.setRequired(false)
						.setMaxValues(3),
				);

			const RadioButtonInput = new LabelBuilder()
				.setLabel('ラジオボタン')
				.setDescription('ここにラジオボタンを追加してください')
				.setRadioGroupComponent(
					new RadioGroupBuilder()
						.setCustomId('radioButtonInput')
						.addOptions(
							new RadioGroupOptionBuilder()
								.setLabel('ラジオオプション 1')
								.setValue('radioOption1')
								.setDescription('これはラジオオプション 1 です')
								.setDefault(true),
							new RadioGroupOptionBuilder()
								.setLabel('ラジオオプション 2')
								.setValue('radioOption2')
								.setDescription('これはラジオオプション 2 です'),
						),
				);

			const multiCheckboxInput = new LabelBuilder()
				.setLabel('複数チェックボックス')
				.setDescription(
					'何かを選んで欲しい時とか、選択肢が複数必要なチェックボックスを追加できます',
				)
				.setCheckboxGroupComponent(
					new CheckboxGroupBuilder()
						.setCustomId('multiCheckboxInput')
						.setMaxValues(2)
						.setRequired(true)
						.setOptions(
							new CheckboxGroupOptionBuilder()
								.setLabel('option1')
								.setValue('op1')
								.setDescription('これはオプション 1 です')
								.setDefault(true),
							new CheckboxGroupOptionBuilder()
								.setLabel('option2')
								.setValue('op2')
								.setDescription('これはオプション 2 です'),
							new CheckboxGroupOptionBuilder()
								.setLabel('option3')
								.setValue('op3')
								.setDescription('これはオプション 3 です'),
						),
				);

			const singleCheckboxInput = new LabelBuilder()
				.setLabel('単体チェックボックス')
				.setDescription(
					'選択肢が複数要らないチェックボックスを追加できます。なお、単一項目を必須化する場合は、単体チェックボックスは必須に出来ないため、groupでオプションを1つだけにする事で実装してください',
				)
				.setCheckboxComponent(
					new CheckboxBuilder().setCustomId('singleCheckboxInput'),
				);

			const textDisplay = new TextDisplayBuilder().setContent(
				'# ※これはテスト用モーダル表示コマンドであり、実行しても何も起こりません。',
			);

			const labelComponents =
				number === 1
					? [
							shortTextInput,
							paragraphTextInput,
							stringSelectMenu,
							fileUploadInput,
						]
					: [RadioButtonInput, multiCheckboxInput, singleCheckboxInput];
			modal
				.addLabelComponents(labelComponents)
				.addTextDisplayComponents(textDisplay);

			await interaction.showModal(modal);
		} catch (err) {
			console.log(err);
		}
	},
};
