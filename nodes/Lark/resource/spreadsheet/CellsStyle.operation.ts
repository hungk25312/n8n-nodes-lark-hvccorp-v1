import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.SetCellStyle,
	value: OperationType.SetCellStyle,
	order: 142,
	options: [
		DESCRIPTIONS.SPREADSHEET_ID,
		DESCRIPTIONS.SHEET_ID,
		DESCRIPTIONS.CELL_RANGE,
		{
			displayName: 'Style',
			name: 'style',
			type: 'collection',
			default: {},
			options: [
				{
					displayName: 'Background Color',
					name: 'backColor',
					type: 'color',
					default: '',
					description: 'Background color, in hexadecimal color code',
				},
				{
					displayName: 'Border Color',
					name: 'borderColor',
					type: 'color',
					default: '',
					description: 'Border color, in hexadecimal color code',
				},
				{
					displayName: 'Border Type',
					name: 'borderType',
					type: 'options',
					default: 'NO_BORDER',
					options: [
						{ name: 'Bottom Border', value: 'BOTTOM_BORDER' },
						{ name: 'Full Border', value: 'FULL_BORDER' },
						{ name: 'Inner Border', value: 'INNER_BORDER' },
						{ name: 'Left Border', value: 'LEFT_BORDER' },
						{ name: 'No Border', value: 'NO_BORDER' },
						{ name: 'Outer Border', value: 'OUTER_BORDER' },
						{ name: 'Right Border', value: 'RIGHT_BORDER' },
						{ name: 'Top Border', value: 'TOP_BORDER' },
					],
				},
				{
					displayName: 'Font Color',
					name: 'foreColor',
					type: 'color',
					default: '',
					description: 'Font color, in hexadecimal color code',
				},
				{
					displayName: 'Font Style',
					name: 'font',
					type: 'collection',
					default: {},
					options: [
						{
							displayName: 'Font Size',
							name: 'fontSize',
							type: 'string',
							default: '',
							hint: '10pt/1.5',
							description: 'Font size: 9 to 36, line spacing fixed at 1.5, for example: 10pt/1.5',
						},
						{ displayName: 'Bold', name: 'bold', type: 'boolean', default: false },
						{ displayName: 'Italic', name: 'italic', type: 'boolean', default: false },
						{ displayName: 'Clean', name: 'clean', type: 'boolean', default: false },
					],
				},
				{
					displayName: 'Horizontal Alignment',
					name: 'hAlign',
					type: 'options',
					default: 0,
					options: [
						{ name: 'Left', value: 0 },
						{ name: 'Middle', value: 1 },
						{ name: 'Right', value: 2 },
					],
					description: 'Horizontal alignment. Optional values: 0: left, 1: middle, 2: right.',
				},
				{
					displayName: 'Number Format',
					name: 'formatter',
					type: 'string',
					default: '',
				},
				{
					displayName: 'Text Decoration',
					name: 'textDecoration',
					type: 'options',
					default: 0,
					options: [
						{ name: 'Default', value: 0 },
						{ name: 'Underline', value: 1 },
						{ name: 'Strikethrough', value: 2 },
						{ name: 'Underline and Strikethrough', value: 3 },
					],
				},
				{
					displayName: 'Vertical Alignment',
					name: 'vAlign',
					type: 'options',
					default: 0,
					options: [
						{ name: 'Top', value: 0 },
						{ name: 'Middle', value: 1 },
						{ name: 'Bottom', value: 2 },
					],
					description: 'Vertical alignment. Optional values: 0: top, 1: middle, 2: bottom.',
				},
			],
		},
		{
			displayName: `<a target="_blank" href="https://open.feishu.cn/document/server-docs/docs/sheets-v3/data-operation/set-cell-style">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spreadsheet_id = this.getNodeParameter('spreadsheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const sheet_id = this.getNodeParameter('sheet_id', index, undefined, {
			extractValue: true,
		}) as string;
		const cell_range = this.getNodeParameter('range', index, '') as string;
		const style = this.getNodeParameter('style', index) as IDataObject;

		const body: IDataObject = {
			appendStyle: {
				range: `${sheet_id}${cell_range}`,
				style,
			},
		};

		const { data } = await RequestUtils.request.call(this, {
			method: 'PUT',
			url: `/open-apis/sheets/v2/spreadsheets/${spreadsheet_id}/style`,
			body,
		});

		return data;
	},
} as ResourceOperation;
