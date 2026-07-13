import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Get Wiki Space Info',
	value: 'getSpaceInfo',
	order: 100,
	options: [
		{
			displayName: 'Wiki Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
			description: 'Wiki space ID, can be obtained from the wiki space list',
		},
		{
			displayName: 'Language',
			name: 'lang',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Simplified Chinese', value: 'zh' },
				{ name: 'Indonesian', value: 'id' },
				{ name: 'German', value: 'de' },
				{ name: 'English', value: 'en' },
				{ name: 'Spanish', value: 'es' },
				{ name: 'French', value: 'fr' },
				{ name: 'Italian', value: 'it' },
				{ name: 'Portuguese', value: 'pt' },
				{ name: 'Vietnamese', value: 'vi' },
				{ name: 'Russian', value: 'ru' },
				{ name: 'Hindi', value: 'hi' },
				{ name: 'Thai', value: 'th' },
				{ name: 'Korean', value: 'ko' },
				{ name: 'Japanese', value: 'ja' },
				{ name: 'Traditional Chinese (Hong Kong)', value: 'zh-HK' },
				{ name: 'Traditional Chinese (Taiwan)', value: 'zh-TW' },
			],
			default: 'zh',
			description: 'Display language for document library names',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const lang = this.getNodeParameter('lang', index) as string;

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/wiki/v2/spaces/${spaceId}`,
			qs: { lang },
		});
	},
} as ResourceOperation;
