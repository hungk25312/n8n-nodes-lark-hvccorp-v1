import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Get Wiki Space List',
	value: 'getWikiSpaceList',
	order: 100,
	options: [
		{
			displayName: 'Page Size',
			name: 'page_size',
			type: 'number',
			default: 20,
			description: 'Page size, maximum value is 50',
		},
		{
			displayName: 'Page Token',
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Page token, leave empty for the first request',
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
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;
		const lang = this.getNodeParameter('lang', index) as string;

		const qs: IDataObject = {
			page_size: pageSize,
			lang,
		};

		if (pageToken) {
			qs.page_token = pageToken;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/wiki/v2/spaces',
			qs,
		});
	},
} as ResourceOperation;
